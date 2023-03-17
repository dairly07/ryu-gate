import { Button } from "react-bootstrap";

export default function SuccessButton({
    proccessing,
    children,
    size,
    type,
    ...props
}) {
    return (
        <Button {...props} type={type} size={size} variant="success">
            {children}
        </Button>
    );
}
