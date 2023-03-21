<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->get('classroom')) {
            $classroom = Classroom::findOrFail($request->get('classroom'));
            $students = Student::where('classroom_id', $classroom->id)->with(['lateStudent'])->orderBy('nis')->get();
            return Inertia::render('Student/StudentByClassroom', [
                'classroom' => $classroom,
                'students' => $students
            ]);
        } else {
            return Inertia::render('Student/Student', [
                'classrooms' => Classroom::latest()->with(['student'])->get()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $classroom = Classroom::findOrFail($request->get('classroom'));
        return Inertia::render('Student/FormStudent', [
            'page_title' => 'Tambah Siswa Kelas ' . $classroom->name . ' ' . $classroom->major,
            'classroom' => $classroom->id
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "nis" => "required|unique:students,nis",
            "name" => "required",
            "phone" => "required"
        ], [],
        [
            "name" => "Nama siswa",
            "phone" => "Telepon"
        ]);

        try {
            DB::beginTransaction();
            Student::create([
                'nis' => $request->nis,
                'name' => $request->name,
                'phone' => $request->phone,
                'classroom_id' => $request->classroom_id
            ]);
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student, Request $request)
    {
        $classroom = Classroom::findOrFail($request->get('classroom'));
        return Inertia::render('Student/FormStudent', [
            'page_title' => 'Edit Siswa Kelas ' . $classroom->name . ' ' . $classroom->major,
            'classroom' => $classroom->id,
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        $request->validate([
            "nis" => "required|unique:students,nis," . $student->id,
            "name" => "required",
            "phone" => "required"
        ], [],
        [
            "name" => "Nama siswa",
            "phone" => "Telepon"
        ]);

        try {
            DB::beginTransaction();
            $student->update([
                'nis' => $request->nis,
                'name' => $request->name,
                'phone' => $request->phone,
                'classroom_id' => $request->classroom_id
            ]);
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        //
    }
}
