import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Classroom = ({ classrooms }) => {
    return (
        <>
            <ContentHeader title="Kelas" />
            <Content>
                <Card>
                    <Card.Header>
                        <h3 class="card-title">Data Kelas</h3>
                    </Card.Header>
                    <Card.Body>
                        <DataTable
                            columns={["Nama Kelas", "Kompetensi Keahlian"]}
                            row={["name", "major"]}
                            data={classrooms}
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
