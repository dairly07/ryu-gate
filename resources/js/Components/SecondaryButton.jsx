import { Button } from "react-bootstrap";

export default function SecondaryButton({
    type = "button",
    children,
    size,
    ...props
}) {
    return (
        <Button
            {...props}
            type={type}
            variant="secondary"
            size={size}
        >
            {children}
        </Button>
    );
}
