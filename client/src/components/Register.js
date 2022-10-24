import { useState } from "react";
import RegisterUser from "./RegisterUser";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register({ onLogin }) {
  const [groupName, setGroupName] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [createdGroup, setCreatedGroup] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group_name: groupName }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((group) => {
          setCurrentGroup(group);
          setCreatedGroup((createdGroup) => !createdGroup);
        });
      } else {
        res.json().then((err) => setError(err.errors));
      }
    });

    setGroupName("");
  }

  return (
    <div className="register">
      <div className="register-titles">
        <h5>
          <b>INVITE ONLY</b> gives you a private space to share photos and memories
          with the people you choose, away from social media. Make your own
          group and share memories!
        </h5>
        <br />
        <h4>Private Feeds</h4>
        <p>Only invited members can see</p>
        <h4>For anyone and anything</h4>
        <p>
          From close friends to extended family or for any occasions like
          trips, weddings and more!
        </p>
      </div>
      {createdGroup ? (
        <RegisterUser onLogin={onLogin} currentGroup={currentGroup} />
      ) : (
        <div className="register-box">
          <h3>Register</h3>
          <br />
          <h5>Step 1. Create group</h5>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Group name</Form.Label>
              <Form.Control
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                type="text"
                name="groupName"
                placeholder="Type group name"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              next
            </Button>
          </Form>
          {error ? <p className="error">{error}</p> : null}
        </div>
      )}
    </div>
  );
}

export default Register;
