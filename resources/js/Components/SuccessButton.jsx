import { Button } from "react-bootstrap";

export default function SuccessButton({
    proccessing,
    children,
    size,
    type = 'button',
    ...props
}) {
    return (
        <Button {...props} type={type} size={size} variant="success" disabled={proccessing}>
            {children}
        </Button>
    );
}
