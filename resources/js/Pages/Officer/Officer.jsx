import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import ModalDeleteConfirm from "@/Components/ModalDeleteConfirm";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const Officer = ({ officers }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [idOfficer, setIdOfficer] = useState("");
    return (
        <>
            <ContentHeader title="Petugas" />
            <Content>
                <Card>
                    <Card.Header>
                        <h3 className="card-title">Data Petugas</h3>
                        <div className="card-tools">
                            <Link
                                className="mr-2 btn btn-primary btn-sm"
                                href={route("officers.create")}
                            >
                                Tambah
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <DataTable
                            columns={[
                                { name: "Code", width: "20%" },
                                { name: "Name" },
                                { name: "Role", width: "25%" },
                                { name: "Aksi", width: "15%" },
                            ]}
                            row={["code", "name", "role", "action"]}
                            data={officers.map((officer) => {
                                return {
                                    code: officer.code,
                                    name: officer.name,
                                    role: officer.role,
                                    action: (
                                        <div
                                            className="d-flex"
                                            style={{ gap: "2px" }}
                                        >
                                            <Link
                                                className="btn btn-warning btn-sm"
                                                href={route('officers.edit', officer.id)}
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    setIdOfficer(officer.id)
                                                    setShowDeleteConfirm(true)
                                                }}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    ),
                                };
                            })}
                        />
                    </Card.Body>
                </Card>
                <ModalDeleteConfirm
                    handleClose={() => {
                        setIdOfficer("");
                        setShowDeleteConfirm(false);
                    }}
                    handleAction={() => {
                        router.delete(route("officers.destroy", idOfficer), {
                            onSuccess: () => {
                                toast.success("Petugas berhasil dihapus!");
                                setIdOfficer("");
                                router.visit(route("officers.index"));
                            },
                            onError: (err) => {
                                toast.error(err.message);
                                setIdOfficer("");
                            },
                        });
                    }}
                    show={showDeleteConfirm}
                />
            </Content>
        </>
    );
};

Officer.layout = (page) => (
    <MainLayout children={page} title="Petugas" auth={page.props.auth} />
);

export default Officer;
