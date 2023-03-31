<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LateStudentController;
use App\Http\Controllers\OfficerController;
use App\Http\Controllers\PrintPDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::check()) {
        return redirect('/dashboard');
    } else {
        return redirect('/login');
    }
})->name('home');

Route::middleware('auth.role:admin')->group(function() {
    Route::get('/print/student-by-classroom/{classroom}', [PrintPDFController::class, 'printStudentByClassroom']);
    Route::get('/print/student-lates-by-date-now', [PrintPDFController::class, 'printLateStudentsByDateNow']);
    Route::post('/students/change-classroom-students', [StudentController::class, 'changeClassroomStudent']);
    Route::post('/students/destroys', [StudentController::class, 'destroys']);
    Route::resource('/classrooms', ClassroomController::class);
    Route::resource('/students', StudentController::class);
    Route::resource('/officers', OfficerController::class);
});

Route::middleware('auth')->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/late-students', LateStudentController::class);
});


require __DIR__.'/auth.php';

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
