import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
  const alertMessage =
    message || "An unexpected error occured. Please try again later";
  const alretVariant = variant || "danger";

  return (
    <Alert variant={alretVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
