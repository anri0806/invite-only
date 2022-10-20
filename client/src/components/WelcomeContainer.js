import { Routes, Route } from "react-router-dom";

import InviteeSignup from "./InviteeSignUp";
import Login from "./Login";
import Register from "./Register";

function WelcomeContainer({ onLogin, location }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="register" element={<Register onLogin={onLogin} />} />
        <Route
          path="users/invitation/accept"
          element={<InviteeSignup onLogin={onLogin} location={location} />}
        />
      </Routes>
    </div>
  );
}

export default WelcomeContainer;
