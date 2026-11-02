<?php

namespace App\Livewire;

use Livewire\Component;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Actions\Contracts\HasActions;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

class PortfolioTable extends Component implements HasForms, HasTable, HasActions
{
    use InteractsWithForms;
    use InteractsWithTable;
    use InteractsWithActions;

    public string $model;
    public string $configClass;
    public ?string $formClass = null;
    public string $identifier;

    public function mount(string $model, string $configClass, ?string $formClass, string $identifier)
    {
        $this->model = $model;
        $this->configClass = $configClass;
        $this->formClass = $formClass;
        $this->identifier = $identifier;
    }

    public function table(Table $table): Table
    {
        $configuredTable = $this->configClass::configure($table)
            ->query($this->model::query())
            ->queryStringIdentifier($this->identifier);

        if ($this->formClass) {
            $configuredTable
                ->headerActions([
                    CreateAction::make()
                        ->form(fn (Schema $schema) => $this->formClass::configure($schema)),
                ])
                ->actions([
                    EditAction::make()
                        ->form(fn (Schema $schema) => $this->formClass::configure($schema)),
                    DeleteAction::make(),
                ]);
        }

        return $configuredTable;
    }

    public function render()
    {
        return view('livewire.portfolio-table');
    }
}
