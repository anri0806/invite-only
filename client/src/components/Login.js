import { useState } from "react";

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
        res.json().then((res) => {
          setError(res.status);
          console.log(res);
        });
      }
    });
  }

  return (
    <>
      <p>Login Page</p>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Type email"
        />
        <label>Password</label>
        <input
          value={formData.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="Type password"
        />
        <button>Login</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
}

export default Login;
