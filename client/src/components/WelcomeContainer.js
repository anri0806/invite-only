import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

function WelcomeContainer({ onLogin }) {
  return (
    <div>
      <p>Welcome Container</p>
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="register" element={<Register onLogin={onLogin} />} />
      </Routes>
    </div>
  );
}

export default WelcomeContainer;