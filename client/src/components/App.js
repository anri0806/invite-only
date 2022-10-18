import "../App.css";
import WebContainer from "./WebContainer";
// import WelcomeContainer from "./WelcomeContainer";
// import HomeContainer from "./HomeContainer";
// import NavBar from "./NavBar";
import InviteeSignup from "./InviteeSignUp";
import { Routes, Route, useParams, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  let { invitation_token } = useParams();
  let location = useLocation();


  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setCurrentUser(user));
  //     }
  //   });
  // }, []);

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    setCurrentUser(null);

    navigate("/");
  }

  ///users/invitation/accept?invitation_token=rC1VUzksD_GdYxqkUvpY"

  return (
    <div>
      <Routes>
        <Route
          path="users/invitation/accept"
          element={
            <InviteeSignup
              onLogin={handleLogin}
              location={location}
            />
          }
        />
        <Route
          path="*"
          element={
            <WebContainer
              currentUser={currentUser}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
