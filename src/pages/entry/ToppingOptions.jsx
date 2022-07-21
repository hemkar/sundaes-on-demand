import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function ToppingOptions({ imagePath, name, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} styles={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      ></img>
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}
