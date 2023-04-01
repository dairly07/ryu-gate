<?php

namespace Tests\Feature;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClassroomTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $user = User::find('557cc772-ed41-46ad-b918-9533defa8a6b');
        $this->actingAs($user);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_list_page()
    {
        $classrooms = Classroom::factory(2)->create();
        $response = $this->get('/classrooms');

        $response->assertStatus(200);
        $response->assertSee($classrooms->toArray()[0]);
        $response->assertSee($classrooms->toArray()[1]);
    }

    public function test_form_create_page()
    {
        $response = $this->get('/classrooms/create');
        $response->assertStatus(200);
    }

    public function test_form_edit_page()
    {
        $classroom = Classroom::factory()->create();
        $response = $this->get("/classrooms/{$classroom->id}/edit");

        $response->assertStatus(200);
        $response->assertSee($classroom->name);
        $response->assertSee($classroom->major);
    }

    public function test_create_classroom()
    {
        $data = [
            'name' => 'XII',
            'major' => 'TITL'
        ];
        $response = $this->post('/classrooms', $data);

        $response->assertStatus(302);
        $this->assertDatabaseHas('classrooms', $data);
    }

    public function test_fails_create_classroom()
    {
        $data = [
            'name' => '',
            'major' => ''
        ];
        $response = $this->post('/classrooms', $data);

        $response->assertSessionHasErrors(['name', 'major']);
        $this->assertDatabaseMissing('classrooms', $data);
    }

    public function test_update_classroom()
    {
        $classroom = Classroom::factory()->create();
        $data = [
            'name' => 'XII',
            'major' => 'TITL 1'
        ];
        $response = $this->put("/classrooms/{$classroom->id}", $data);

        $response->assertStatus(302);
        $this->assertDatabaseHas('classrooms', $data);
    }

    public function test_fails_update_classroom()
    {
        $classroom = Classroom::factory()->create();
        $data = [
            'name' => '',
            'major' => ''
        ];
        $response = $this->put("/classrooms/{$classroom->id}", $data);

        $response->assertSessionHasErrors(['name', 'major']);
        $this->assertDatabaseHas('classrooms', ['id' => $classroom->id]);
    }

    public function test_delete_classroom()
    {
        $classroom = Classroom::factory()->create();
        $response = $this->delete("/classrooms/{$classroom->id}");

        $response->assertStatus(302);
        $this->assertSoftDeleted('classrooms', [ 'id' => $classroom->id ]);
    }

    public function test_fails_delete_classroom()
    {
        $classroom = Classroom::factory()->create();
        $response = $this->delete("/classrooms/sdfjasdfkjs");

        $response->assertStatus(404);
        $this->assertDatabaseHas('classrooms', ['id' => $classroom->id]);
        $this->get('/classrooms')->assertSee($classroom->name);
    }
}
