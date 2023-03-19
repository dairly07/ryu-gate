import ContentHeader from "@/Components/ContentHeader";
import MainLayout from "@/Layouts/MainLayout";
import generatePagination from "@/Utils/generatePagination";
import Content from "@/Widgets/Content";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Card, Pagination } from "react-bootstrap";

const Student = ({ classrooms }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [classroomsPaginationData, setClassroomsPaginationData] = useState([]);
    const [pagePagination, setPagePagination] = useState(0);
    const [pageCurrent, setCurrentPage] = useState(0);
    const handlePagePrevious = () => {
        setCurrentPage((value) => --value);
    };
    const handlePageNext = () => {
        setCurrentPage((value) => ++value);
    };
    useEffect(() => {
        const { data, totalPage } = generatePagination(classrooms, 12);
        setClassroomsPaginationData(data);
        setPagePagination(totalPage);
    }, []);
    return (
        <>
            <ContentHeader title="Siswa" />
            <Content>
                <div>
                    <div className="row">
                        <div className="col-md-4 offset-md-1">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    placeholder="Cari kelas..."
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-default btn-primary"
                                    >
                                        <i className="fa fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 offset-md-1">
                            <hr className="my-3" />
                            <div className="row">
                                {classroomsPaginationData[pageCurrent]?.filter((classroom) => [classroom.name, classroom.major].join(" ").toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                                    classroomsPaginationData[pageCurrent]?.filter((classroom) => [classroom.name, classroom.major].join(" ").toLowerCase().includes(searchQuery.toLowerCase())).map((classroom, i) => (
                                        <div key={i} className="col-md-3">
                                            <Card>
                                                <Card.Body>
                                                    <h4>
                                                        {classroom.name}{" "}
                                                        {classroom.major}
                                                    </h4>
                                                    <p>
                                                        {classroom.student.length}{" "}
                                                        siswa
                                                    </p>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Link
                                                        className="text-decoration-none text-dark"
                                                        href={`/students?clasrooms=${classroom.id}`}
                                                    >
                                                        Detail
                                                    </Link>
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <h4>Kelas tidak ditemukan!</h4>
                                    </div>
                                )}
                                {/* {
                                    classroomsPaginationData[pageCurrent]?.map((classroom, i) => (
                                        <div key={i} className="col-md-3">
                                            <Card>
                                                <Card.Body>
                                                    <h4>
                                                        {classroom.name}{" "}
                                                        {classroom.major}
                                                    </h4>
                                                    <p>
                                                        {classroom.student.length}{" "}
                                                        siswa
                                                    </p>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Link
                                                        className="text-decoration-none text-dark"
                                                        href={`/students?clasrooms=${classroom.id}`}
                                                    >
                                                        Detail
                                                    </Link>
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    ))
                                } */}
                            </div>
                            <hr className="my-3" />
                            <div className="d-flex justify-content-end">
                                <Pagination>
                                    <Pagination.Item
                                        disabled={pageCurrent === 0}
                                        onClick={handlePagePrevious}
                                    >
                                        Previous
                                    </Pagination.Item>
                                    <Pagination.Item
                                        disabled={
                                            pagePagination === pageCurrent + 1
                                        }
                                        onClick={handlePageNext}
                                    >
                                        Next
                                    </Pagination.Item>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

Student.layout = (page) => (
    <MainLayout children={page} title="Siswa" auth={page.props.auth} />
);

export default Student;
