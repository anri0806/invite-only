import "../App.css";
import WelcomeContainer from "./WelcomeContainer";
import HomeContainer from "./HomeContainer";
import NavBar from "./NavBar";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();
export const LoginUserContext = createContext();

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



  function handleUpdateCurrentUser(updatedData) {
    setCurrentUser(updatedData);
  }



  function handleUpdateAvatar(updatedData) {
    setCurrentUser(updatedData);
  }



  function handleLogout() {
    setCurrentUser(null);

    navigate("/");
  }



  return (
    <div className="app">
      <UserContext.Provider value={currentUser}>
        <NavBar onLogout={handleLogout} />
        {currentUser ? (
          <HomeContainer
            onEditUpdate={handleUpdateCurrentUser}
            onEditUpdateAvatar={handleUpdateAvatar}
          />
        ) : (
          <WelcomeContainer onLogin={handleLogin} location={location} />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
