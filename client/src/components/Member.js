import UserProfilePage from "./UserProfilePage";
import { useParams, Link } from "react-router-dom";

function Member({ member, onRenderFilteredPosts }) {


  return (
    <>
      <UserProfilePage
        currentUser={member}
        onRenderFilteredPosts={onRenderFilteredPosts}
      />
      <br />
      <Link to="/members"  >Go back to members</Link>
    </>
  );
}

export default Member;