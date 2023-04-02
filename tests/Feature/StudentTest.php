<?php

namespace Tests\Feature;

use App\Models\Classroom;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StudentTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $user = User::find('2c2552b0-4d3e-4891-9a59-23be07f4a8c6');
        $this->actingAs($user);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_list_page()
    {
        $students = Student::factory(2)->create();
        $response = $this->get('/students');

        $response->assertStatus(200);
        $response->assertSee($students->toArray()[0]);
        $response->assertSee($students->toArray()[1]);
    }

    public function test_form_create_page()
    {
        $classroom = Classroom::factory()->create();
        $response = $this->get("/students/create?classroom=" . $classroom->id);
        $response->assertStatus(200);
    }

    public function test_form_edit_page()
    {
        $student = Student::factory()->create();
        $response = $this->get("/students/{$student->id}/edit?classroom=" . $student->classroom_id);

        $response->assertStatus(200);
        $response->assertSee($student->toArray());
    }

    public function test_create_student()
    {
        $classroom = Classroom::factory()->create();
        $data = [
            'nis' => '28851',
            'name' => 'Ryan Suranjana',
            'phone' => '081928938422',
            'classroom_id' => $classroom->id
        ];
        $response = $this->post(route('students.store'), $data);
        $data['classroom_id'] = $classroom->id;
        $response->assertStatus(302);
        $this->assertDatabaseHas('students', $data);
    }

    public function test_fails_create_student()
    {
        $classroom = Classroom::factory()->create();
        $data = [
            'nis' => '',
            'name' => '',
            'phone' => '',
            'classroom_id' => ''
        ];
        $response = $this->post(route('students.store'), $data);
        $data['classroom_id'] = $classroom->id;

        $response->assertSessionHasErrors(['nis', 'name', 'phone']);
        $this->assertDatabaseMissing('students', $data);
    }

    public function test_update_student()
    {
        $student = Student::factory()->create();
        $data = [
            'nis' => '28840',
            'name' => 'Kadek Aris',
            'phone' => '081928938344',
            'classroom_id' => $student->classroom_id
        ];
        $response = $this->put(route('students.update', ['student' =>$student->id]), $data);

        $response->assertStatus(302);
        $this->assertDatabaseHas('students', $data);
    }

    public function test_fails_update_student()
    {
        $student = Student::factory()->create();
        $data = [
            'nis' => '',
            'name' => '',
            'phone' => ''
        ];
        $response = $this->put("/students/{$student->id}", $data);

        $response->assertSessionHasErrors(['nis', 'name', 'phone']);
        $this->assertDatabaseHas('students', ['id' => $student->id]);
    }

    public function test_delete_student()
    {
        $students = Student::factory(5)->create();
        $studentsDelete = $students->map(fn($value, $key) => $value['id']);

        $response = $this->post("/students/destroys", [
            'student_id' => $studentsDelete->toArray()
        ]);

        $response->assertStatus(200);
        foreach ($studentsDelete as $key => $student) {
            $this->assertSoftDeleted('students', ['id' => $student]);
        }
    }

    public function test_fails_delete_student()
    {
        $students = Student::factory(2)->create();
        $studentsDelete = $students->map(fn($value, $key) => $value['id']);

        $response = $this->post("/students/destroys", []);
        foreach ($studentsDelete as $key => $student) {
            $this->assertDatabaseHas('students', ['id' => $student]);
        }
        $this->get('/students')->assertSee($students->toArray()[0]);
        $this->get('/students')->assertSee($students->toArray()[1]);
    }

    public function test_change_classroom_student()
    {
        $students = Student::factory(2)->create();
        $classroom = Classroom::factory()->create();
        $studentsId = $students->map(fn($value, $key) => $value['id']);

        $response = $this->post('/students/change-classroom-students', [
            'classroom_id' => $classroom->id,
            'student_id' => $studentsId
        ]);

        $response->assertStatus(200);
    }

    public function test_fails_change_classroom_student()
    {
        $students = Student::factory(2)->create();
        $classroom = Classroom::factory()->create();
        $studentsId = $students->map(fn($value, $key) => $value['id']);

        $response = $this->post('/students/change-classroom-students', [
            'classroom_id' => '',
            'student_id' => $studentsId
        ]);

        $response->assertSessionHasErrors(['classroom_id']);
    }

}
