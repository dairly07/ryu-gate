<?php

namespace App\Imports;

use App\Models\Classroom;
use App\Models\Student;
use Maatwebsite\Excel\Concerns\ToModel;

class StudentImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $classroom = Classroom::where('name', $row[3])->where('major', $row[4])->first();
        return new Student([
            'nis' => $row[0],
            'name' => $row[1],
            'phone' => $row[2],
            'classroom_id' => $classroom->id
        ]);
    }
}
