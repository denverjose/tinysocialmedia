import { Fragment, useEffect, useContext, useCallback } from "react";
import PostForm from "../components/ProfilePosts/PostForm";
import AuthContext from "../store/auth-context";
import PostsList from "../components/ProfilePosts/PostsList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllPosts } from "../lib/api";

const Feed = () => {
  const authCtx = useContext(AuthContext);
  const profileId = authCtx.token;

  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const addedPostHandler = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  let posts;
  if (status === "pending") {
    posts =<div className="centered">
        <LoadingSpinner />
      </div>
  }

  if (status === "completed" && loadedPosts && loadedPosts.length > 0) {
    posts= <PostsList posts={loadedPosts} />

  }

  if (error) {
    posts= <p className="centered">{error}</p>;
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    posts=<h1>NO POSTS</h1> 
  }

  return (
    <Fragment>
      <PostForm profileId={profileId} onAddedPost={addedPostHandler} />
      {posts}
    </Fragment>
  );
};

export default Feed;
