<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OfficerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $user = User::where('role', 'admin')->first();
        $this->actingAs($user);
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_list_page()
    {
        $officers = User::factory(2)->create();
        $response = $this->get('/officers');

        $response->assertStatus(200);
        $response->assertSee($officers->toArray()[0]);
        $response->assertSee($officers->toArray()[1]);
    }

    public function test_form_create_page()
    {
        $response = $this->get('/officers/create');
        $response->assertStatus(200);
    }

    public function test_form_edit_page()
    {
        $officer = User::factory()->create();
        $response = $this->get("/officers/{$officer->id}/edit");

        $response->assertStatus(200);
        $response->assertSee($officer->toArray());
    }

    public function test_create_officer()
    {
        $data = [
            'code' => 'JJ19',
            'name' => 'made jun',
            'password' => 'password',
            'role' => 'petugas'
        ];
        $response = $this->post('/officers', $data);

        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'code' => 'JJ19',
            'name' => 'made jun',
            'role' => 'petugas'
        ]);
    }

    public function test_fails_create_officer()
    {
        $data = [
            'code' => '',
            'name' => '',
            'password' => '',
            'role' => ''
        ];
        $response = $this->post('/officers', $data);

        $response->assertSessionHasErrors(['code', 'name', 'password', 'role']);
        $this->assertDatabaseMissing('users', $data);
    }

    public function test_update_officer()
    {
        $officer = User::factory()->create();
        $data = [
            'code' => 'JJ19',
            'name' => 'made jul',
            'password' => 'password',
            'role' => 'petugas'
        ];
        $response = $this->put("/officers/{$officer->id}", $data);

        $response->assertStatus(302);
        $this->assertDatabaseHas('users', [
            'code' => 'JJ19',
            'name' => 'made jun',
            'role' => 'petugas'
        ]);
    }

    public function test_fails_update_officer()
    {
        $officer = User::factory()->create();
        $data = [
            'code' => '',
            'name' => '',
            'role' => ''
        ];
        $response = $this->put("/officers/{$officer->id}", $data);

        $response->assertSessionHasErrors(['code', 'name', 'role']);
        $this->assertDatabaseHas('users', ['id' => $officer->id]);
    }

    public function test_delete_officer()
    {
        $officer = User::factory()->create();
        $response = $this->delete("/officers/{$officer->id}");

        $response->assertStatus(302);
        $this->assertSoftDeleted('users', [ 'id' => $officer->id ]);
    }

    public function test_fails_delete_officer()
    {
        $officer = User::factory()->create();
        $response = $this->delete("/officers/sdfjasdfkjs");

        $response->assertStatus(404);
        $this->assertDatabaseHas('users', ['id' => $officer->id]);
        $this->get('/officers')->assertSee($officer->name);
    }
}
