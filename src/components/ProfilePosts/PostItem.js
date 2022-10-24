import classes from "./PostItem.module.css";
import { Link } from "react-router-dom";
import Likes from "../LIkes/Likes";
import Avatar from "@mui/material/Avatar";

const PostItem = (props) => {
  return (
    <li className={classes.post}>
      <Link
        className={classes.detail}
        to={`/post/${props.postedBy}?postId=${props.postId}`}
      >
        <button>Details</button>
      </Link>
      <div className={classes.profile}>
        <Avatar
          alt={props.fullName}
          src={props.profilePicture}
          sx={{ width: 56, height: 56 }}
        />
        <Link className={classes.name} to={`/profile/${props.postedBy}`}>{props.fullName}</Link>
      </div>
      <p>{props.text}</p>
      <Likes postId={props.postId} />
    </li>
  );
};

export default PostItem;
