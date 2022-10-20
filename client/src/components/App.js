import "../App.css";
import WelcomeContainer from "./WelcomeContainer";
import HomeContainer from "./HomeContainer";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);


  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setCurrentUser(user);

    navigate("/");
  }

  function handleLogout() {
    setCurrentUser(null);

    navigate("/");
  }

  return (
    <div>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      {currentUser ? (
        <HomeContainer currentUser={currentUser} />
      ) : (
        <WelcomeContainer
          currentUser={currentUser}
          onLogin={handleLogin}
          location={location}
        />
      )}
      {/* <Routes>
        <Route
          path="users/invitation/accept"
          element={<InviteeSignup onLogin={handleLogin} location={location} />}
        />
        <Route path="*" />
      </Routes> */}
    </div>
  );
}

export default App;
