import { useState } from "react";

function InviteeSignup({ onLogin, location }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errors, setErrors] = useState(null);

//   console.log(location.search.slice(18));

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `/users/invitation/accept?invitation_token=${location.search.slice(18)}`,
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
          },
        }),
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => {
          console.log("Successfully logged in.");
          onLogin(currentUser);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <p>Please set your username and password to sign up.</p>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="type username"
        />
        <br />
        <label>Password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="type password"
        />
        <br />
        <label>Confirm Password: </label>
        <input
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          type="password"
          name="confirmation_password"
          placeholder="type confirmation password"
        />
        <br />
        <button>Sign up</button>
      </form>
      {errors ? (
        <>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </>
      ) : null}
    </>
  );
}

export default InviteeSignup;
