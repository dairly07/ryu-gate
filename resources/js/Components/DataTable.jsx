import React, { useEffect, useState } from 'react'
import generatePagination from '@/Utils/generatePagination'
import Table from 'react-bootstrap/Table';
import { Pagination } from 'react-bootstrap';

const DataTable = ({ columns, row, data }) => {
    const [dataTables, setDataTables] = useState([]);
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
        setDataTables(pagination.data)
        setPagePagination(pagination.totalPage);
    }, [data])
    return (
        <>
            <Table hover responsive>
                <thead>
                    <tr className='fw-bold'>
                        {columns.map((column, i) => (
                            <td key={i}>{column}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTables.length > 0 ? (
                        dataTables[pageCurrent].map((dataTable, j) => {
                            return (
                                <tr key={j}>
                                    {row.map((element, i) => {
                                        if(dataTable.hasOwnProperty(element)) {
                                            return (
                                                <td key={i}>{dataTable[element]}</td>
                                            )
                                        }
                                    })}
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center">Data tidak ditemukan!</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.Item disabled={pageCurrent === 0} onClick={handlePagePrevious}>Previous</Pagination.Item>
                <Pagination.Item disabled={pagePagination === pageCurrent + 1} onClick={handlePageNext}>Next</Pagination.Item>
            </Pagination>
        </>
    )
}

export default DataTable
