<?php

namespace Tests\Feature;

use App\Filament\Pages\ManageHeader;
use App\Models\HeaderSetting;
use App\Models\User;
use App\Support\SiteData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SocialLinkPlacementTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_networks_show_until_a_choice_is_saved(): void
    {
        $this->assertSame(array_keys(HeaderSetting::SOCIAL_NETWORKS), SiteData::share()['social']['footer']);
    }

    public function test_each_place_shows_only_the_chosen_networks(): void
    {
        HeaderSetting::create(['contact_social_links' => ['linkedin', 'github'], 'footer_social_links' => ['medium']]);

        $social = SiteData::share()['social'];

        $this->assertSame(['github', 'linkedin'], $social['contact']);
        $this->assertSame(['medium'], $social['footer']);
    }

    public function test_the_main_switch_hides_every_icon(): void
    {
        HeaderSetting::create(['show_social_links' => false, 'footer_social_links' => ['github']]);

        $this->assertSame([], SiteData::share()['social']['footer']);
        $this->assertSame([], SiteData::share()['social']['contact']);
    }

    public function test_the_settings_page_shows_the_choices(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(ManageHeader::getUrl())
            ->assertOk()
            ->assertSee('Icons in the contact section')
            ->assertSee('Icons in the footer and phone menu');
    }
}
