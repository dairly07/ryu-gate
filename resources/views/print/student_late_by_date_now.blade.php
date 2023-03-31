<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report | Siswa Terlambat Tangggal {{ $date }}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <h3 class="text-center my-4">Data Siswa Terlambat Tanggal {{ $date }}</h3>
    <div class="row">
        <div class="col-md-8 col-12">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <td>Nis</td>
                        <td>Nama</td>
                        <td>Kelas</td>
                        <td>Telepon</td>
                        <td>Waktu Terlambat</td>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($students as $student)
                        <tr>
                            <td>{{ $student->nis }}</td>
                            <td>{{ $student->name }}</td>
                            <td>{{ $student->classroom->name }} {{ $student->classroom->major }}</td>
                            <td>{{ $student->phone }}</td>
                            <td>{{ $student->lateStudent[0]->time_late }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center">Tidak ada siswa yang terlambat!</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
