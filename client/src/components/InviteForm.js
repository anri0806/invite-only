import { useState } from "react";

function InviteForm({ currentUser }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("group_id", currentUser.group_id);

    fetch("/users/invitation", {
      method: "POST",
      //   headers: {
      //     "Content-Type": "application.json",
      //   },
      body: formData,
      //   JSON.stringify({ user: { email: email } })
    }).then((res) => {
      if (res.ok) {
        alert("Invitation has been sent");
        setError(null)
      } else {
        res.json().then((err) => setError(err.error));
      }
    });

    setEmail("");
  }

  return (
    <>
      <h3>Send an invitation</h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
        />
        <button>Send</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
}
export default InviteForm;
