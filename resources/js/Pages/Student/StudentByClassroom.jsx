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
import ModalForm from "@/Components/ModalForm";
import useModal from "@/Hooks/useModal";

const StudentByClassroom = ({ classrooms, classroom, students }) => {
    const deleteConfirm = useModal();
    const formChangeClassroom = useModal();
    const [idCheckboxStudents, setIdCheckboxStudents] = useState([]);
    const [classroomChange, setClassroomChange] = useState("");
    const handleDelete = () => {
        router.post(
            "/students/destroys",
            {
                student_id: idCheckboxStudents,
            },
            {
                onSuccess: () => {
                    toast.success("Siswa berhasil dihapus");
                    setIdCheckboxStudents([]);
                    deleteConfirm.handleClose();
                    router.visit(`/students?classroom=${classroom.id}`);
                },
                onError: (err) => {
                    toast.error(err.message);
                    deleteConfirm.handleClose();
                },
            }
        );
    };
    const handleChangeClassroom = (event) => {
        event.preventDefault();
        router.post(
            "/students/change-classroom-students",
            {
                student_id: idCheckboxStudents,
                classroom_id: classroomChange,
            },
            {
                onSuccess: () => {
                    toast.success("Siswa berhasil ganti kelas");
                    setIdCheckboxStudents([]);
                    formChangeClassroom.handleClose();
                    setClassroomChange("");
                    router.visit(`/students?classroom=${classroom.id}`);
                },
                onError: (err) => {
                    toast.error(err.message);
                    formChangeClassroom.handleClose();
                    setClassroomChange("");
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
                                setIdCheckboxStudents([
                                    ...idCheckboxStudents,
                                    student.id,
                                ]);
                            } else {
                                const filterDeleteStudents =
                                    idCheckboxStudents.filter(
                                        (studentId) => studentId !== student.id
                                    );
                                setIdCheckboxStudents(filterDeleteStudents);
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
                    <Link
                        className="btn btn-primary btn-sm"
                        href={`/students/${student.id}`}
                    >
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
                            <a
                                className="mr-2 btn btn-warning btn-sm"
                                href={`/print/student-by-classroom/${classroom.id}`}
                                target="_blank"
                            >
                                <i className="fas fa-print mr-1"></i>
                                Cetak PDF
                            </a>
                            <Link
                                className="mr-2 btn btn-primary btn-sm"
                                href={`/students/create?classroom=${classroom.id}`}
                            >
                                Tambah
                            </Link>
                            <Button
                                className="mr-2"
                                variant="warning"
                                size="sm"
                                disabled={idCheckboxStudents.length === 0}
                                onClick={formChangeClassroom.handleShow}
                            >
                                Ganti Kelas
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                disabled={idCheckboxStudents.length === 0}
                                onClick={deleteConfirm.handleShow}
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
                <ModalForm
                    show={formChangeClassroom.show}
                    handleClose={formChangeClassroom.handleClose}
                    title="Ganti Kelas Siswa"
                    onSubmit={handleChangeClassroom}
                >
                    <select
                        className="form-control"
                        value={classroomChange}
                        onChange={(event) =>
                            setClassroomChange(event.target.value)
                        }
                        required
                    >
                        <option value="" disabled>
                            Pilih Kelas
                        </option>
                        {classrooms.map((classroom) => (
                            <option
                                value={classroom.id}
                                key={classroom.id}
                            >{`${classroom.name} ${classroom.major}`}</option>
                        ))}
                    </select>
                </ModalForm>
                <ModalDeleteConfirm
                    handleClose={deleteConfirm.handleClose}
                    handleAction={handleDelete}
                    show={deleteConfirm.show}
                />
            </Content>
        </>
    );
};

StudentByClassroom.layout = (page) => (
    <MainLayout children={page} title="Siswa" auth={page.props.auth} />
);

export default StudentByClassroom;
