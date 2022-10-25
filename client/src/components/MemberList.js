import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

import Member from "./Member";

function MemberList({ onRenderFilteredPosts }) {
  const [members, setMembers] = useState([]);
  const [clickedMember, setClickedMember] = useState(null);


  const currentUser = useContext(UserContext);



  useEffect(() => {
    fetch(`/get_users/${currentUser.group_id}`)
      .then((res) => res.json())
      .then((users) => setMembers(users));
  }, []);



  function handleClickedMember(member) {
    setClickedMember(member);
  }

  
  return (
    <>
      {clickedMember ? (
        <Member
          member={clickedMember}
          onRenderFilteredPosts={onRenderFilteredPosts}
        />
      ) : (
        <div className="member-list">
          <h4>Members</h4>
          <br />
          {members
            .filter((member) => member.id !== currentUser.id)
            .map((member) => (
              <div
                key={member.id}
                className="member-card"
                onClick={() => handleClickedMember(member)}
              >
                <img
                  className="member-avatar"
                  src={member.avatar}
                  alt="avatar"
                />
                <div className="member-name">
                  <p>{member.username}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default MemberList;
