import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RegisterUser({ onLogin, currentGroup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: passwordConfirm,
          group_id: currentGroup.id,
          admin: true,
        },
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => onLogin(currentUser));
      } else {
        res.json().then((err) => {
          console.log(err.status.message);
          setErrors(err.status.message);
        });
      }
    });

    setFormData({ username: "", email: "", password: "" });
    setPasswordConfirm("");
  }

  return (
    <div className="register-box">
      <h5>Step 2. Create your account </h5>
      <p style={{ fontSize: "14px" }}>
        *You can start inviting people after creating your account
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={formData.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Type username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Type email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Type password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            name="password_confirmation"
            placeholder="Confirm password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
      {errors ? (
        <>
          <p className="error">{errors.replace(/[^,'\w\s]/g, "")}</p>
          {/* {errors.map((err) => (
            <p key={err}>{err}</p>
          ))} */}
        </>
      ) : null}
    </div>
  );
}

export default RegisterUser;
