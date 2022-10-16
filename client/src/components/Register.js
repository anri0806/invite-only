import { useState } from "react";
import RegisterUser from "./RegisterUser";

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
    <>
      {createdGroup ? (
        <RegisterUser onLogin={onLogin} currentGroup={currentGroup} />
      ) : (
        <>
          <h4>Register page</h4>
          <p>step 1.</p>
          <p>Create group</p>
          <form onSubmit={handleSubmit}>
            <label>Group name</label>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              name="groupName"
              placeholder="Type group name"
            />
            <br />
            <button>next</button>
          </form>
          {error ? <p>{error}</p> : null}
        </>
      )}
    </>
  );
}

export default Register;
