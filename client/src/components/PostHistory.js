import PostContainer from "./PostContainer";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function PostHistory({
  currentUser,
  userPosts,
  onRenderFilteredPosts,
  onEditPost,
}) {
  return (
    <div className="post-history">
      <Tabs defaultActiveKey="Posts">
        <Tab eventKey="Posts" title="Posts">
          <PostContainer
            currentUser={currentUser}
            posts={userPosts}
            onRenderFilteredPosts={onRenderFilteredPosts}
            onEditPost={onEditPost}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default PostHistory;
