import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  return (
    <div className={classes.comment} key={props.id}>
      <Avatar alt={props.fullName} src={props.profilePicture} />
      <div className={classes.profile}>
        <Link className={classes.name} to={`/profile/${props.commentedBy}`}>
          {props.fullName}
        </Link>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
