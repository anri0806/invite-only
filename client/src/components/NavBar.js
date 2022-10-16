import { Link } from "react-router-dom";

function NavBar({ currentUser, onLogout }) {

  function handleClick() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <>
      {currentUser ? (
        <>
          <Link to="/">Feed</Link> | <Link to="profile">Profile</Link> |{" "}
          <Link to="members">Members</Link> |{" "}
          {currentUser.admin ? (
            <>
              {" "}
              <Link to="invite">Invite People</Link> |{" "}
            </>
          ) : null}
          <Link onClick={handleClick}>Logout</Link>
        </>
      ) : (
        <>
          {" "}
          <Link to="/">Home</Link> | <Link to="register">Register</Link>
        </>
      )}
    </>
  );
}

export default NavBar;