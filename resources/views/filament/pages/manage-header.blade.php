<x-filament-panels::page>
    <form wire:submit="save">
        {{ $this->form }}

        {{-- Stays at the bottom of the screen, so Save is always within reach while editing any section --}}
        <div
            style="position: sticky; bottom: 0; z-index: 20; margin-top: 1.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(6px); border: 1px solid #e5e7eb; border-radius: 0.75rem; box-shadow: 0 -4px 16px -8px rgba(0, 0, 0, 0.18);"
        >
            <span style="font-size: 0.875rem; color: #6b7280;">
                <span wire:dirty wire:target="data" style="color: #b45309; font-weight: 600;">You have unsaved changes.</span>
                <span wire:dirty.remove wire:target="data">Changes apply to the whole site once saved.</span>
            </span>

            <x-filament::button type="submit" wire:loading.attr="disabled" wire:target="save">
                <span wire:loading.remove wire:target="save">Save changes</span>
                <span wire:loading wire:target="save">Saving…</span>
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
