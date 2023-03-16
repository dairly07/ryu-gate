import React, { useEffect, useState } from 'react'
import generatePagination from '@/Utils/generatePagination'
import Table from 'react-bootstrap/Table';
import { Pagination } from 'react-bootstrap';

const DataTable = ({ columns, data }) => {
    const [dataTables, setDataTable] = useState([]);
    const [pagePagination, setPagePagination] = useState(0);
    const [pageCurrent, setCurrentPage] = useState(0);

    const handlePagePrevious = () => {
        setCurrentPage((value) => --value);
    }
    const handlePageNext = () => {
        setCurrentPage((value) => ++value);
    }

    useEffect(() => {
        const pagination = generatePagination(data);
        setDataTable(generatePagination(pagination.data))
        setPagePagination(pagination.totalPage);
    }, data)
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <td>{column.name}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTables.length > 0 ? (
                        dataTables[pageCurrent].map((dataTable) => {
                            return (<tr>
                                {dataTable.values().map((value) => (
                                        <td>{value}</td>
                                ))}
                            </tr>)
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1}>Data tidak ditemukan!</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.Item disabled={pageCurrent === 0} onClick={handlePagePrevious}>Previous</Pagination.Item>
                <Pagination.Item disabled={pageCurrent === pagePagination} onClick={handlePageNext}>Next</Pagination.Item>
            </Pagination>
        </>
    )
}

export default DataTable
