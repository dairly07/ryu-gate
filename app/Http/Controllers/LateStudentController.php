<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\LateStudent;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LateStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lateStudent = Student::whereHas('lateStudent', fn($query) => $query->whereDate('date_late', Carbon::today()))->get();
        return Inertia::render('StudentLate/StudentLate', [
            'students' => Student::with('classroom')->get(),
            'lateStudents' => $lateStudent->load(['classroom', 'lateStudent' => fn($query) => $query->whereDate('date_late', Carbon::today())]),
            'classrooms' => Classroom::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'student_id' => 'required',
            'time_late' => 'required',
            'date_late' => 'required'
        ], [],
        [
            'student_id' => 'Siswa',
            'late_time' => 'Waktu terlambat'
        ]);

        if(Student::find($request->student_id)->whereHas('lateStudent', fn($query) => $query->whereDate('date_late', Carbon::today()))->get()) {
            return redirect()->back()->withErrors([
                'message' => 'Siswa sudah terdaftar di data siswa terlambat hari ini'
            ]);
        }

        try {
            DB::beginTransaction();
            LateStudent::create([
                'student_id' => $request->student_id,
                'time_late' => $request->time_late,
                'date_late' => $request->date_late
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
     * @param  \App\Models\LateStudent  $lateStudent
     * @return \Illuminate\Http\Response
     */
    public function show(LateStudent $lateStudent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LateStudent  $lateStudent
     * @return \Illuminate\Http\Response
     */
    public function edit(LateStudent $lateStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LateStudent  $lateStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LateStudent $lateStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LateStudent  $lateStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(LateStudent $lateStudent)
    {
        try {
            DB::beginTransaction();
            $lateStudent->delete();
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }
}
