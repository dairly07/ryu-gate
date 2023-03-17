<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Classroom/Classroom', [
            'classrooms' => Classroom::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Classroom/FormClassroom', [
            'page_title' => 'Tambah Kelas'
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
            'name' => 'required',
            'major' => 'required'
        ], [], [
            'name' => 'nama kelas',
            'major' => 'kompetensi keahlian'
        ]);
        try {
            DB::beginTransaction();
            Classroom::create([
                'name' => $request->name,
                'major' => $request->major
            ]);
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(Classroom $classroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function edit(Classroom $classroom)
    {
        return Inertia::render('Classroom/FormClassroom', [
            'page_title' => 'Edit Kelas',
            'classrooms' => $classroom
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Classroom $classroom)
    {
        $request->validate([
            'name' => 'required',
            'major' => 'required'
        ]);
        try {
            DB::beginTransaction();
            $classroom->update([
                'name' => $request->name,
                'major' => $request->major
            ]);
            DB::commit();
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function destroy(Classroom $classroom)
    {
        //
    }
}
