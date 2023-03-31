<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Officer/Officer', [
            'officers' => User::where('id', '!=', Auth::user()->id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Officer/FormOfficer', [
            'page_title' => 'Tambah Petugas'
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
            'code' => 'required|max:5|unique:users,code',
            'name' => 'required',
            'role' => 'required',
            'password' => 'required|max:12|min:8'
        ], [], [
            'code' => 'Petugas code',
            'name' => 'Nama'
        ]);

        try {
            DB::beginTransaction();
            User::create([
                'code' => $request->code,
                'name' => $request->name,
                'role' => $request->role,
                'password' => bcrypt($request->password)
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Officer/FormOfficer', [
            'page_title' => 'Edit Petugas',
            'officer' => User::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|max:5|unique:users,code,' . $id,
            'name' => 'required',
            'role' => 'required',
            'password' => 'nullable|max:12|min:8'
        ], [], [
            'code' => 'Petugas code',
            'name' => 'Nama'
        ]);

        try {
            DB::beginTransaction();
            $data = [
                'code' => $request->code,
                'name' => $request->name,
                'role' => $request->role,
            ];
            if($request->has('password')) {
                $data['password'] = bcrypt($request->password);
            }
            User::findOrFail($id)->update($data);
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            User::findOrFail($id)->delete();
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
