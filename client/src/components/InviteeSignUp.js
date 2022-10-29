import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function InviteeSignup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [group, setGroup] = useState("");

  let { token } = useParams();

  useEffect(() => {
  fetch(`/get_group/${token}`)
      .then((res) => res.json())
      .then((group) => setGroup(group.group_name));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `/accept_invitation`,
      // `/users/invitation/accept?invitation_token=${location.search.slice(18)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
            password_confirmation: confirmationPassword,
            admin: false,
            invitation_token: token,
          },
        }),
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          onLogin(user);
        });
      } else {
        res.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <div className="invitee-signup">
      <h4>Sign up to join {group}</h4>
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter username"
              // required
            />
          </Form.Group>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter password"
                // required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formBasicPasswordConfirmation"
            >
              <Form.Control
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                type="password"
                name="confirmation_password"
                placeholder="Confirm password"
                // required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Join
        </Button>
      </Form>
      <br />
      {errors ? (
        <>
          {errors.map((err) => (
            <p key={err} className="error">
              {err}
            </p>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default InviteeSignup;
