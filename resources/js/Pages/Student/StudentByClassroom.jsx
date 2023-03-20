import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import ContentHeader from "@/Components/ContentHeader";
import { Link } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import Content from "@/Widgets/Content";
import { Card } from "react-bootstrap";
import DataTable from "@/Components/DataTable";

const StudentByClassroom = ({ classroom, students }) => {
    const data = students.map((student) => {
        return {
            checkbox: (
                <div className="text-center">
                    <Checkbox/>
                </div>
            ),
            nis: student.nis,
            name: student.name,
            phone: student.phone,
            total_late: student.late_student.length,
            action: (
                <div className="d-flex" style={{ gap: "2px" }}>
                    <Link className="btn btn-primary btn-sm" href={""}>
                        Detail
                    </Link>
                    <Link className="btn btn-warning btn-sm" href={""}>
                        Edit
                    </Link>
                </div>
            ),
        };
    });
    const columns = [
        {
            name: " ",
            width: "5%",
        },
        {
            name: "Nis",
            width: "10%",
        },
        {
            name: "Nama",
        },
        {
            name: "Telepon",
        },
        {
            name: "Total Terlambat",
            width: "15%",
        },
        {
            name: "Aksi",
            width: "10%"
        },
    ];
    console.log({ students });
    return (
        <>
            <ContentHeader
                title={`Siswa Kelas ${classroom.name} ${classroom.major}`}
            />
            <Content>
                <Card>
                    <Card.Header>
                        <h3 className="card-title">Data Siswa {`${classroom.name} ${classroom.major}`}</h3>
                        <div className="card-tools">
                            <Link
                                className="mr-2 btn btn-warning btn-sm"
                                href={route("students.create")}
                            >
                                <i className="fas fa-print mr-1"></i>
                                Cetak PDF
                            </Link>
                            <Link
                                className="mr-2 btn btn-primary btn-sm"
                                href={route("students.create")}
                            >
                                Tambah
                            </Link>
                            <Link
                                className="mr-2 btn btn-warning btn-sm"
                                href={route("students.create")}
                            >
                                Ganti Kelas
                            </Link>
                            <Link
                                className="mr-2 btn btn-danger btn-sm"
                                href={route("students.create")}
                            >
                                Delete
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <DataTable
                            data={data}
                            columns={columns}
                            row={[
                                "checkbox",
                                "nis",
                                "name",
                                "phone",
                                "total_late",
                                "action",
                            ]}
                        />
                    </Card.Body>
                </Card>
            </Content>
        </>
    );
};

StudentByClassroom.layout = (page) => (
    <MainLayout children={page} title="Siswa" auth={page.props.auth} />
);

export default StudentByClassroom;
