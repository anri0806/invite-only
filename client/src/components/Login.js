import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: formData }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          onLogin(res.data);
        });
      } else {
        setError("Incorrect username or password");
      }
    });
  }

  return (
    <div id="login-page">
      <div id="login-title">
        <h1>
          <b>INVITE ONLY</b>
        </h1>
        <h4>Private social media for family and friends.</h4>
      </div>
      <div id="login-box">
        <Form onSubmit={handleSubmit}>
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
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        {error ? <p className="error">{error}</p> : null}
        <p>
          Don't have an account? <Link to="register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
