import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";
import logo from "../Images/logo1.jpg";

function NavBar({ onLogout }) {
  const currentUser = useContext(UserContext);

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
          <Link to="/">
            <img src={logo} alt="logo" width="85px" />
          </Link>
          {/* | <Link to="register">Register</Link> */}
        </>
      )}
    </>
  );
}

export default NavBar;
