import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalDeleteConfirm = ({ handleClose, handleAction, show }) => {
    return (
        <Modal show={show} centered>
            <Modal.Body className='d-flex flex-column text-center'>
                <i className='fas fa-exclamation-triangle my-3 text-danger' style={{ fontSize: '3rem' }}></i>
                <p style={{ fontSize: '1.2rem' }}>Apakah yakin ingin menghapus data ini?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="danger" onClick={handleAction}>
                    Yakin
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteConfirm
