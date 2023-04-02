import { useState } from "react";

const useModal = (initialValue = false) => {
    const [show, setShow] = useState(initialValue);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true)
    }

    return { show, handleClose, handleShow }
}

export default useModal;
