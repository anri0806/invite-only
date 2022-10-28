import { Routes, Route } from "react-router-dom";

import InviteeSignup from "./InviteeSignUp";
import Login from "./Login";
import Register from "./Register";

function WelcomeContainer({ onLogin, location }) {


  return (
    <div className="bcg">
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="register" element={<Register onLogin={onLogin} />} />
        <Route
          path="users/invitation/accept/:token"
          element={<InviteeSignup onLogin={onLogin} location={location} />}
        />
      </Routes>
    </div>
  );
}

export default WelcomeContainer;
