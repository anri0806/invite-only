import { useState } from "react";

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
          // password_confirmation: passwordConfirm,
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Type username"
        />
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Type email"
        />
        <input
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Type password"
        />
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          name="password_confirmation"
          placeholder="Confirm password"
        />
        <button>Create account</button>
      </form>
      {errors ? (
        <>
        <p>{errors.replace(/[^,'\w\s]/g, '')}</p>
          {/* {errors.map((err) => (
            <p key={err}>{err}</p>
          ))} */}
        </>
      ) : null}
    </>
  );
}

export default RegisterUser;
