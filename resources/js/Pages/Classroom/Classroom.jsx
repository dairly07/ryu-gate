import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Classroom = ({ classrooms }) => {
    const data = classrooms.map((classroom) => {
        return {
            name: classroom.name,
            major: classroom.major,
            action: (
                <div className="d-flex" style={{ gap: "2px" }}>
                    <Link className="btn btn-warning btn-sm" href={route('classrooms.edit', classroom.id)}>
                        Edit
                    </Link>
                    <Link className="btn btn-danger btn-sm" href="">
                        Hapus
                    </Link>
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
                                href={route('classrooms.create')}
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
            </Content>
        </>
    );
};

Classroom.layout = (page) => (
    <MainLayout children={page} title="Kelas" auth={page.props.auth} />
);

export default Classroom;
