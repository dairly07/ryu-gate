<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Request;

class PrintPDFController extends Controller
{
    public function printStudentByClassroom(Classroom $classroom)
    {
        $students = Student::has('lateStudent')->where('classroom_id', $classroom->id)->with(['lateStudent'])->get();

        $pdf = PDF::loadview('print/student_by_classroom', [
            'classroom' => $classroom,
            'students' => $students
        ]);
        return $pdf->download('siswa-terlambat-kelas-' . $classroom->name . '-' . $classroom->major);
    }
}
