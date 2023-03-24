<?php

namespace App\Http\Controllers;

use App\Models\LateStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LateStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
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
