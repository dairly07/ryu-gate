import ContentHeader from "@/Components/ContentHeader";
import DataTable from "@/Components/DataTable";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link } from "@inertiajs/react";
import { Card } from "react-bootstrap";

const Dashboard = ({ studentCount, classroomCount, lateStudents }) => {
    return (
        <>
            <ContentHeader title="Dashboard" />
            <Content>
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>150</h3>
                                <p>New Orders</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag" />
                            </div>
                            <a href="#" className="small-box-footer">
                                Detail{" "}
                                <i className="fas fa-arrow-circle-right" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>
                                    53
                                    <sup style={{ fontSize: 20 }}>%</sup>
                                </h3>
                                <p>Siswa terlambat</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-stats-bars" />
                            </div>
                            <a href="#" className="small-box-footer">
                                Detail{" "}
                                <i className="fas fa-arrow-circle-right" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{classroomCount}</h3>
                                <p>Kelas</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-table" />
                            </div>
                            <Link
                                href={`/classrooms`}
                                className="small-box-footer"
                            >
                                Detail{" "}
                                <i className="fas fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{studentCount}</h3>
                                <p>Siswa</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-graduation-cap" />
                            </div>
                            <Link
                                href={`/students`}
                                className="small-box-footer"
                            >
                                Detail{" "}
                                <i className="fas fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <Card.Title>Data Siswa terlambat hari ini</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={[
                                        { name: 'NIS', width: '10%' },
                                        { name: 'Name' },
                                        { name: 'Kelas', width: '20%' },
                                        { name: 'Waktu Terlambat', width: '20%' },
                                    ]}
                                    row={['nis', 'name', 'classroom', 'time_late']}
                                    data={lateStudents.map((student) => {
                                        return {
                                            nis: student.nis,
                                            name: student.name,
                                            classroom: `${student.classroom.name} ${student.classroom.major}`,
                                            time_late: `${student.late_student[0].time_late}`
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

Dashboard.layout = (page) => (
    <MainLayout children={page} title="Dashboard" auth={page.props.auth} />
);

export default Dashboard;
