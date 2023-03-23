import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import ContentHeader from "@/Components/ContentHeader";
import Content from "@/Widgets/Content";
import { Button, Card } from "react-bootstrap";
import DataTable from "@/Components/DataTable";

const ShowStudent = ({ student }) => {
    console.log(student);
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
                                    row={['date_late', 'time_late', 'action']}
                                    data={student.late_student.map((late) => {
                                        return {
                                            date_late: late.date_late,
                                            time_late: late.time_late,
                                            action: (
                                                <Button variant="danger" size="sm">Delete</Button>
                                            )
                                        }
                                    })}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Content>
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
