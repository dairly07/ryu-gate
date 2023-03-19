import React, { useEffect, useState } from "react";
import generatePagination from "@/Utils/generatePagination";
import Table from "react-bootstrap/Table";
import { Form, Pagination } from "react-bootstrap";

const DataTable = ({ columns, row, data }) => {
    const [dataTables, setDataTables] = useState([]);
    const [pagePagination, setPagePagination] = useState(0);
    const [pageCurrent, setCurrentPage] = useState(0);
    const [showEntries, setShowEntries] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const handlePagePrevious = () => {
        setCurrentPage((value) => --value);
    };
    const handlePageNext = () => {
        setCurrentPage((value) => ++value);
    };

    useEffect(() => {
        const {data: dataPagination, totalPage} = generatePagination(data, showEntries);
        setDataTables(dataPagination);
        setPagePagination(totalPage);
        setCurrentPage(0);
    }, [data]);
    useEffect(() => {
        const dataFilter = data.filter((value) => Object.values(value).join(" ").toLowerCase().includes(searchQuery.toLowerCase()));
        const {data: dataPagination, totalPage} = generatePagination(dataFilter, showEntries);
        setDataTables(dataPagination);
        setPagePagination(totalPage);
        setCurrentPage(0);
    }, [searchQuery, showEntries]);
    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <div className="d-flex gap-1">
                    <p>Show</p>
                    <div>
                        <Form.Select size="sm" value={showEntries} onChange={(event) => setShowEntries(event.target.value)}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </Form.Select>
                    </div>
                    <p>entries</p>
                </div>
                <div
                    className="input-group input-group-sm"
                    style={{ width: 200 }}
                >
                    <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
            </div>
            <Table hover responsive>
                <thead>
                    <tr className="fw-bold">
                        {columns.map((column, i) => (
                            <td
                                key={i}
                                width={column.width ? column.width : ""}
                            >
                                {column.name}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTables.length > 0 ? (
                        dataTables[pageCurrent].map((dataTable, j) => {
                            return (
                                <tr key={j}>
                                    {row.map((element, i) => {
                                        if (dataTable.hasOwnProperty(element)) {
                                            return (
                                                <td key={i}>
                                                    {dataTable[element]}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="text-center"
                            >
                                Data tidak ditemukan!
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Pagination>
                    <Pagination.Item
                        disabled={pageCurrent === 0}
                        onClick={handlePagePrevious}
                    >
                        Previous
                    </Pagination.Item>
                    <Pagination.Item
                        disabled={pagePagination === pageCurrent + 1}
                        onClick={handlePageNext}
                    >
                        Next
                    </Pagination.Item>
                </Pagination>
            </div>
        </>
    );
};

export default DataTable;
