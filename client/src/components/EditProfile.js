import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditProfile({ currentUser, onClickClose, onEditUpdate }) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [error, setError] = useState(null);


  function handleEditProfile(e) {
    e.preventDefault();

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, email: email }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedProfile) => {
          onEditUpdate(updatedProfile);
          onClickClose();
        });
      } else {
        res.json().then((err) => {
          setError(err.error);
        });
      }
    });
  }

  
  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="material-symbols-outlined close_button"
          onClick={onClickClose}
        >
          close
        </span>
        <br />
        <Form onSubmit={handleEditProfile}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
            />
          </Form.Group>
          <br />

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
            />
          </Form.Group>

          <br />
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
        {error ? <p className="error">{error}</p> : null}
      </div>
    </div>
  );
}

export default EditProfile;
