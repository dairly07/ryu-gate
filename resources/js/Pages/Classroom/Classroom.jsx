import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import ModalDeleteConfirm from "@/Components/ModalDeleteConfirm";
import useModal from "@/Hooks/useModal";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const Classroom = ({ classrooms }) => {
    const { show, handleClose, handleShow } = useModal();
    const [idClassroom, setIdClassroom] = useState("");
    const data = classrooms.map((classroom) => {
        return {
            name: classroom.name,
            major: classroom.major,
            action: (
                <div className="d-flex" style={{ gap: "2px" }}>
                    <Link
                        className="btn btn-warning btn-sm"
                        href={route("classrooms.edit", classroom.id)}
                    >
                        Edit
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            setIdClassroom(classroom.id)
                            handleShow()
                        }}
                    >
                        Hapus
                    </Button>
                </div>
            ),
        };
    });
    const columns = [
        {
            name: "Nama Kelas",
        },
        {
            name: "Kompetensi Keahlian",
        },
        {
            name: "Aksi",
            width: "20%",
        },
    ];
    return (
        <>
            <ContentHeader title="Kelas" />
            <Content>
                <Card>
                    <Card.Header>
                        <h3 className="card-title">Data Kelas</h3>
                        <div className="card-tools">
                            <Link
                                className="mr-2 btn btn-primary btn-sm"
                                href={route("classrooms.create")}
                            >
                                Tambah
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <DataTable
                            columns={columns}
                            row={["name", "major", "action"]}
                            data={data}
                        />
                    </Card.Body>
                </Card>
                <ModalDeleteConfirm
                    handleClose={() => {
                        setIdClassroom("");
                        handleClose()
                    }}
                    handleAction={() => {
                        router.delete(route("classrooms.destroy", idClassroom), {
                            onSuccess: () => {
                                toast.success("Kelas berhasil dihapus!");
                                setIdClassroom("");
                                router.visit(route("classrooms.index"));
                            },
                            onError: (err) => {
                                toast.error(err.message);
                                setIdClassroom("");
                            },
                        });
                    }}
                    show={show}
                />
            </Content>
        </>
    );
};

Classroom.layout = (page) => (
    <MainLayout children={page} title="Kelas" auth={page.props.auth} />
);

export default Classroom;
