import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

import Member from "./Member";

function MemberList({
  onRenderFilteredPosts,
  onClickedMember
}) {
  const [members, setMembers] = useState([]);
  const [clickedMember, setClickedMember] = useState(null);

  // <Member
  //   member={selectedMember}
  //   onRenderFilteredPosts={renderFilteredPosts}
  // />;

  const currentUser = useContext(UserContext);

  useEffect(() => {
    fetch(`/get_users/${currentUser.group_id}`)
      .then((res) => res.json())
      .then((users) => setMembers(users));
  }, []);

  // function handleClick(member) {
  //   onClickedMember(member);
  // }

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
              <div key={member.id} className="member-card">
                {/* <Link
            to={`/members/${member.id}`}
            onClick={() => handleClick(member)}
          >
            {member.username}
          </Link> */}
                <p onClick={() => handleClickedMember(member)}>
                  {member.username}
                </p>
              </div>
            ))}

          {/* <Outlet /> */}
        </div>
      )}
    </>
  );
}

export default MemberList;
