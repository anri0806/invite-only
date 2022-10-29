import { useState, useContext } from "react";
import { UserContext } from "./App";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "./LoadingSpinner";

function InviteForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("group_id", currentUser.group_id);

    setIsLoading(true);

    fetch("/users/invitation", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setIsLoading(false);
        setShowAlert((showAlert) => !showAlert);
        setError(null);
      } else {
        res.json().then((err) => {
          setIsLoading(false);
          setError(err.error);
        });
      }
    });

    setEmail("");
    setShowAlert(false);
  }

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      {showAlert ? (
        <Alert variant="success">Invitation has been sent!</Alert>
      ) : null}
      <h4>Send an invitation</h4>
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Button
              variant="outline-secondary"
              type="submit"
              disabled={isLoading}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
      {error ? <p className="error">{error}</p> : null}
    </>
  );
}
export default InviteForm;
