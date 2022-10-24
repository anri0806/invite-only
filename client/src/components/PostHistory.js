import PostContainer from "./PostContainer";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function PostHistory({ currentUser, userPosts, onRenderFilteredPosts }) {
  return (
    <div className="post-history">
      <Tabs defaultActiveKey="Posts" >
        <Tab eventKey="Posts" title="Posts" >
          <PostContainer
            currentUser={currentUser}
            posts={userPosts}
            onRenderFilteredPosts={onRenderFilteredPosts}
          />
        </Tab>
        {/* <Tab eventKey="example" title="example"></Tab> */}
      </Tabs>
    </div>
  );
}

export default PostHistory;
