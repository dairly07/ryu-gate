import React from 'react'
import { Modal } from 'react-bootstrap'
import SuccessButton from './SuccessButton'

const ModalForm = ({ handleClose, show, title, onSubmit, children, proccessing }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <SuccessButton type="submit" size="sm" proccessing={proccessing}>Simpan</SuccessButton>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalForm
