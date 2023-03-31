import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import ContentHeader from "@/Components/ContentHeader";
import Content from "@/Widgets/Content";
import { Button, Card } from "react-bootstrap";
import DataTable from "@/Components/DataTable";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import ModalDeleteConfirm from "@/Components/ModalDeleteConfirm";
import moment from "moment";
import useModal from "@/Hooks/useModal";

const ShowStudent = ({ student }) => {
    const { show, handleClose, handleShow } = useModal();
    const [idDeleteDataLate, setIdDeleteDataLate] = useState("");
    const handleDeleteDataLate = () => {
        router.delete(`/late-students/${idDeleteDataLate}`, {
            onSuccess: () => {
                toast.success("Data Terlambat berhasil dihapus");
                handleClose()
                setIdDeleteDataLate("");
                router.visit(`/students/${student.id}`);
            },
            onError: (err) => {
                toast.error(err.message);
                handleClose()
                setIdDeleteDataLate("");
            },
        });
    };
    return (
        <>
            <ContentHeader title={`Detail Siswa ${student.name}`} />
            <Content>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <Card>
                            <Card.Header>Biodata Siswa</Card.Header>
                            <Card.Body>
                                <div className="mb-3 lh-1">
                                    <p className="fw-bold">NIS</p>
                                    <p>{student.nis}</p>
                                </div>
                                <div className="mb-3 lh-1">
                                    <p className="fw-bold">Nama</p>
                                    <p>{student.name}</p>
                                </div>
                                <div className="mb-3 lh-1">
                                    <p className="fw-bold">Kelas</p>
                                    <p>{`${student.classroom.name} ${student.classroom.major}`}</p>
                                </div>
                                <div className="mb-3 lh-1">
                                    <p className="fw-bold">Telepon</p>
                                    <p>{student.phone}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-8 col-12">
                        <Card>
                            <Card.Header>Data Riwayat Terlambat</Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={[
                                        { name: "Tanggal Terlambat" },
                                        { name: "Waktu Terlambat" },
                                        { name: "Aksi", width: "15%" },
                                    ]}
                                    row={["date_late", "time_late", "action"]}
                                    data={student.late_student.map((late) => {
                                        return {
                                            date_late: moment(
                                                late.date_late
                                            ).format("L"),
                                            time_late: late.time_late,
                                            action: (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setIdDeleteDataLate(
                                                            late.id
                                                        );
                                                        handleShow();
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            ),
                                        };
                                    })}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Content>
            <ModalDeleteConfirm
                handleClose={() => {
                    handleClose();
                    setIdDeleteDataLate("");
                }}
                handleAction={handleDeleteDataLate}
                show={show}
            />
        </>
    );
};

ShowStudent.layout = (page) => (
    <MainLayout
        children={page}
        title={page.props.page_title}
        auth={page.props.auth}
    />
);

export default ShowStudent;
