import { Fragment, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../../store/auth-context";
import { like, unlike, getPostLike } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import classes from "./Likes.module.css";
import { pink } from "@mui/material/colors";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Comments from "../Comments/Comments";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Likes = (props) => {
  const [showComment, setShowComment] = useState(false);
  const [showLike, setShowLike] = useState(false);

  const authCtx = useContext(AuthContext);
  const profileId = authCtx.token;
  const {
    sendRequest: getPostLikes,
    status: likeStatus,
    data: loadedLikes,
  } = useHttp(getPostLike);
  const { sendRequest, status, error } = useHttp(like);

  const {
    sendRequest: sendUnlike,
    status: statusUnlike,
    error: errorUnlike,
  } = useHttp(unlike);

  useEffect(() => {
    getPostLikes(props.postId);
  }, [props.postId, getPostLikes]);

  const addedLikesHandler = useCallback(() => {
    getPostLikes(props.postId);
  }, [getPostLikes, props.postId]);

  useEffect(() => {
    if (status === "completed" && !error) {
      addedLikesHandler();
    }
  }, [status, error, addedLikesHandler]);

  useEffect(() => {
    if (statusUnlike === "completed" && !errorUnlike) {
      addedLikesHandler();
    }
  }, [statusUnlike, errorUnlike, addedLikesHandler]);

  const submitLikeHandler = () => {
    sendRequest({
      likeData: {
        userId: profileId,
      },
      profileId: profileId,
      postId: props.postId,
    });
  };
  const toggleLike = () => {
    setShowLike((prevState) => !prevState);
  };

  let likes;

  const submitUnlikeHandler = () => {
    let likeId;
    loadedLikes.map((like) => {
      if (like.userId === profileId) {
        likeId = like.id;
      }
      return true;
    });
    sendUnlike({
      likeId: likeId,
      postId: props.postId,
    });
  };

  let likeButton = (
    <ThumbUpOutlinedIcon color="action" onClick={submitLikeHandler} />
  );
  if (likeStatus === "completed" && loadedLikes && loadedLikes.length > 0) {
    const isLiked = loadedLikes.find((user) => user.userId === profileId);

    likes = (
      <div className={classes.likes}>
          <ThumbUpAltIcon sx={{ color: pink[500] }} onClick={toggleLike} />
          {loadedLikes.length}
          <Modal
            open={showLike}
            onClose={toggleLike}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {loadedLikes.map((user) => (
                <Typography key={user.id} id="modal-modal-title" variant="h6" component="h2">
                  {user.fullName}
                </Typography>
              ))}
            </Box>
          </Modal>
      </div>
    );

    if (isLiked) {
      likeButton = (
        <ThumbUpAltIcon color="error" onClick={submitUnlikeHandler} />
      );
    }
  }

  if (
    likeStatus === "completed" &&
    (!loadedLikes || loadedLikes.length === 0)
  ) {
    likes = "";
  }

  const toggleCommentShow = () => {
    setShowComment((prevState) => !prevState);
  };

  return (
    <Fragment>
      {likes}
      <div className={classes.action}>
        {likeButton}
        {showComment ? (
          <ModeCommentIcon onClick={toggleCommentShow} />
        ) : (
          <ModeCommentOutlinedIcon onClick={toggleCommentShow} color="action" />
        )}
      </div>
      {showComment && <Comments postId={props.postId} />}
    </Fragment>
  );
};

export default Likes;
