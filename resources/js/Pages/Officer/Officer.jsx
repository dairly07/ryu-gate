import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link } from "@inertiajs/react";
import React from "react";
import { Button, Card } from "react-bootstrap";

const Officer = ({ officers }) => {
    console.log({ officers });
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
                                                onClick={() => {}}
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
            </Content>
        </>
    );
};

Officer.layout = (page) => (
    <MainLayout children={page} title="Petugas" auth={page.props.auth} />
);

export default Officer;
