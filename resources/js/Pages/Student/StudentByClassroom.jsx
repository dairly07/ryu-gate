import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import ContentHeader from "@/Components/ContentHeader";
import { Link, router } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import Content from "@/Widgets/Content";
import { Button, Card } from "react-bootstrap";
import DataTable from "@/Components/DataTable";
import ModalDeleteConfirm from "@/Components/ModalDeleteConfirm";
import { toast } from "react-toastify";

const StudentByClassroom = ({ classroom, students }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteStudents, setDeleteStudents] = useState([]);
    const handleDelete = () => {
        router.post(
            "/students/destroys",
            {
                student_id: deleteStudents,
            },
            {
                onSuccess: () => {
                    toast.success("Siswa berhasil dihapus");
                    setDeleteStudents([]);
                    setShowDeleteConfirm(false);
                    router.visit(`/students?classroom=${classroom.id}`)
                },
                onError: (err) => {
                    toast.error(err.message);
                    setShowDeleteConfirm(false);
                },
            }
        );
    };
    const data = students.map((student) => {
        return {
            checkbox: (
                <div className="text-center">
                    <Checkbox
                        onChange={(event) => {
                            if (event.target.checked) {
                                setDeleteStudents([
                                    ...deleteStudents,
                                    student.id,
                                ]);
                            } else {
                                const filterDeleteStudents =
                                    deleteStudents.filter(
                                        (studentId) => studentId !== student.id
                                    );
                                setDeleteStudents(filterDeleteStudents);
                            }
                        }}
                    />
                </div>
            ),
            nis: student.nis,
            name: student.name,
            phone: student.phone,
            total_late: student.late_student.length,
            action: (
                <div className="d-flex" style={{ gap: "2px" }}>
                    <Link className="btn btn-primary btn-sm" href={`/students/${student.id}`}>
                        Detail
                    </Link>
                    <Link
                        className="btn btn-warning btn-sm"
                        href={`/students/${student.id}/edit?classroom=${student.classroom_id}`}
                    >
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
            width: "10%",
        },
    ];
    return (
        <>
            <ContentHeader
                title={`Siswa Kelas ${classroom.name} ${classroom.major}`}
            />
            <Content>
                <Card>
                    <Card.Header>
                        <h3 className="card-title">
                            Data Siswa {`${classroom.name} ${classroom.major}`}
                        </h3>
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
                                href={`/students/create?classroom=${classroom.id}`}
                            >
                                Tambah
                            </Link>
                            <Link
                                className="mr-2 btn btn-warning btn-sm"
                                href={route("students.create")}
                            >
                                Ganti Kelas
                            </Link>
                            <Button
                                variant="danger"
                                size="sm"
                                disabled={deleteStudents.length === 0}
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Delete
                            </Button>
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
                <ModalDeleteConfirm
                    handleClose={() => {
                        setShowDeleteConfirm(false);
                    }}
                    handleAction={handleDelete}
                    show={showDeleteConfirm}
                />
            </Content>
        </>
    );
};

StudentByClassroom.layout = (page) => (
    <MainLayout children={page} title="Siswa" auth={page.props.auth} />
);

export default StudentByClassroom;
