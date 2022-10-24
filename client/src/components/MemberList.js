import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

function MemberList({ onClickedMember }) {
  const [members, setMembers] = useState([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    fetch(`/get_users/${currentUser.group_id}`)
      .then((res) => res.json())
      .then((users) => setMembers(users));
  }, []);

  function handleClick(member) {
    onClickedMember(member);
  }

  return (
    <div className="member-list">
      <h4>Members</h4>
      <br />
      {members
        .filter((member) => member.id !== currentUser.id)
        .map((member) => (
          <div key={member.id} className="member-card">
            <Link
              to={`/members/${member.id}`}
              onClick={() => handleClick(member)}
            >
              {member.username}
            </Link>
          </div>
        ))}

      <Outlet />
    </div>
  );
}

export default MemberList;
