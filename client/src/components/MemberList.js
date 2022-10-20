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
    <>
      <h4>member list</h4>
      {members
        .filter((member) => member.id !== currentUser.id)
        .map((member) => (
          <div key={member.id}>
            <Link
              to={`/members/${member.id}`}
              onClick={() => handleClick(member)}
            >
              {member.username}
            </Link>
          </div>
        ))}

      <Outlet />
    </>
  );
}

export default MemberList;