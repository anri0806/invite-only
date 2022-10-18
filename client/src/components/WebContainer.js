import WelcomeContainer from "./WelcomeContainer";
import HomeContainer from "./HomeContainer";
import NavBar from "./NavBar";

function WebContainer({currentUser, onLogin, onLogout}) {
    return (
        <>
        <NavBar currentUser={currentUser} onLogout={onLogout} />
          {currentUser ? (
            <HomeContainer currentUser={currentUser} />
          ) : (
            <WelcomeContainer currentUser={currentUser} onLogin={onLogin} />
          )}
        </>
    )
}

export default WebContainer