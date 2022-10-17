import { useState } from "react";

function InviteForm({ currentUser }) {
  const [email, setEmail] = useState("");

  /// START FROM HERE ///
  // call User.invite!(email: 'morty@ricknmortyforever1000years.com')
  // to create a user, assign user an invite token,
  // and set it up so the user can sign up via the email that they receive

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
    })
    .then((res) => {
      if (res.ok) {
        console.log("Invitation Sent")
    //     res.json().then((data) => {
    //       console.log("successful: ", data);
        // });
      } else {
        res.json().then((err) => console.log("error: ", err.error));
      }
    });

    setEmail("")
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
    </>
  );
}
export default InviteForm;
