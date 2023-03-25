<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        function getQueryDateNow($query) {
            $query->whereDate('date_late', Carbon::today());
        }
        $lateStudent = Student::whereHas('lateStudent', fn($query) => getQueryDateNow($query))->get();
        return Inertia::render('Dashboard', [
            'studentCount' => count(Student::all()),
            'classroomCount' => count(Classroom::all()),
            'lateStudents' => $lateStudent->load(['classroom', 'lateStudent' => fn($query) => getQueryDateNow($query)])
        ]);
    }

}
