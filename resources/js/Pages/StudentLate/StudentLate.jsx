import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import ModalDeleteConfirm from "@/Components/ModalDeleteConfirm";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const StudentLate = ({ students, lateStudents, classrooms }) => {
    console.log({ students, lateStudents, classrooms });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [idDeleteDataLate, setIdDeleteDataLate] = useState("");
    const [classroomInput, setClassroomInput] = useState("");
    const [studentInput, setStudentInput] = useState("");
    const [timeLateInput, setTimeLateInput] = useState("");
    const data = lateStudents.map((student) => {
        return {
            nis: student.nis,
            name: student.name,
            time_late: student.late_student[0].time_late,
            action: (
                <div className="d-flex" style={{ gap: "2px" }}>
                    <Link
                        className="btn btn-primary btn-sm"
                        href={`/students/${student.id}`}
                    >
                        Detail
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            setIdDeleteDataLate(student.late_student[0].id);
                            setShowDeleteConfirm(true);
                        }}
                    >
                        Hapus
                    </Button>
                </div>
            ),
        };
    });
    const handleDeleteDataLate = () => {
        router.delete(`/late-students/${idDeleteDataLate}`, {
            onSuccess: () => {
                toast.success("Data Terlambat berhasil dihapus");
                setShowDeleteConfirm(false);
                setIdDeleteDataLate("");
                router.visit(`/late-students`);
            },
            onError: (err) => {
                toast.error(err.message);
                setShowDeleteConfirm(false);
                setIdDeleteDataLate("");
            },
        });
    };
    return (
        <>
            <ContentHeader title="Siswa Terlambat Hari Ini" />
            <Content>
                <div className="row mb-2">
                    <div className="col-12">
                        <form>
                            <Card>
                                <Card.Header>
                                    <h3 className="card-title">
                                        Masukkan Siswa Terlambat
                                    </h3>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-md-4 col-12">
                                            <Form.Select
                                                value={classroomInput}
                                                onChange={(event) =>
                                                    setClassroomInput(
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Kelas
                                                </option>
                                                {classrooms.map((classroom) => (
                                                    <option
                                                        value={classroom.id}
                                                        key={classroom.id}
                                                    >{`${classroom.name} ${classroom.major}`}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <Form.Select
                                                disabled={
                                                    classroomInput
                                                        ? false
                                                        : true
                                                }
                                                value={studentInput}
                                                onChange={(event) =>
                                                    setStudentInput(
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Siswa
                                                </option>
                                                {students
                                                    .filter(
                                                        (student) =>
                                                            student.classroom
                                                                .id ===
                                                            classroomInput
                                                    )
                                                    .map((student) => (
                                                        <option
                                                            value={student.id}
                                                            key={classroom.id}
                                                        >{`${student.nis} - ${student.name}`}</option>
                                                    ))}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <input
                                                type="text"
                                                placeholder="Masukkan waktu siswa terlambat"
                                                className="form-control"
                                                value={timeLateInput}
                                                onChange={(event) =>
                                                    setTimeLateInput(
                                                        event.target.value
                                                    )
                                                }
                                                onFocus={(event) =>
                                                    (event.target.type = "time")
                                                }
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <SecondaryButton size="sm" className="mr-1">
                                        Reset
                                    </SecondaryButton>
                                    <SuccessButton size="sm" type="submit">
                                        Simpan
                                    </SuccessButton>
                                </Card.Footer>
                            </Card>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <h3 className="card-title">Data Siswa</h3>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={[
                                        { name: "NIS", width: "10%" },
                                        { name: "Nama" },
                                        {
                                            name: "Waktu Terlambat",
                                            width: "25%",
                                        },
                                        { name: "Aksi", width: "15%" },
                                    ]}
                                    row={["nis", "name", "time_late", "action"]}
                                    data={data}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <ModalDeleteConfirm
                    handleClose={() => {
                        setShowDeleteConfirm(false);
                    }}
                    handleAction={handleDeleteDataLate}
                    show={showDeleteConfirm}
                />
            </Content>
        </>
    );
};

StudentLate.layout = (page) => (
    <MainLayout
        children={page}
        title="Siswa Terlambat"
        auth={page.props.auth}
    />
);

export default StudentLate;
