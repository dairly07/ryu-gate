import { useState } from "react";

const useModal = (initialValue = false) => {
    const [show, setShow] = useState(initialValue);

    const handleClose = (callback = () => {}) => {
        setShow(false);
        callback();
    }

    const handleShow = (callback = () => {}) => {
        setShow(true)
        callback()
    }

    return { show, handleClose, handleShow }
}

export default useModal;
