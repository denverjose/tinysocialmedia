import React, { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { editProfile } from "../../lib/api";
import ProfileContext from "../../store/profile-context";
import classes from "./Edit.module.css";
import Card from "../UI/Card";

const Edit = (props) => {
  const [profile, setProfile] = useState(props.profile);
  const [profilePicture, setProfilePicture] = useState(
    props.profile.profilePicture
  );
  const { sendRequest, status } = useHttp(editProfile);
  const history = useHistory();
  const profileCtx = useContext(ProfileContext);

  const updateProfile = profileCtx.callBack;

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
      updateProfile();
    }
  }, [status, history, updateProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      data: {
        profilePicture: profilePicture,
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        email: profile.email,
        birthday: profile.birthday,
        password: profile.password,
      },
      profileId: props.profileId,
    });
    console.log(profile);
  };

  return (
    <Card className={classes.auth}>
      <form name="createForm" onSubmit={handleSubmit}>
        <div className={classes.haha}>
          <input
            id="file-input"
            style={{ display: "none" }}
            type="file"
            name="myImage"
            label="profilePicture"
            onChange={(e) =>
              setProfilePicture(URL.createObjectURL(e.target.files[0]))
            }
          />
          <label className={classes.image} htmlFor="file-input">
            <Avatar
              variant="square"
              alt={profile.firstName}
              sx={{ width: 180, height: 180 }}
              src={profilePicture}
            />
          </label>
          <label htmlFor="file-input" className={classes.edit}>
            +
          </label>
        </div>
        <div className={classes.control}>
          <label>First Name:</label>
          <input
            type="text"
            label="firstName"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
        </div>
        <div className={classes.control}>
          <label className="">Last Name:</label>
          <input
            type="text"
            label="lastName"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
        </div>
        <div className={classes.control}>
          <label className="">Bio:</label>
          <input
            type="text"
            label="bio"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
        <div className={classes.control}>
          <label className="">Email:</label>
          <input
            type="email"
            label="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className={classes.control}>
          <label className="">Birthday:</label>
          <input
            type="date"
            label="phone"
            value={profile.birthday}
            min="1950-01-01"
            onChange={(e) =>
              setProfile({ ...profile, birthday: e.target.value })
            }
          />
        </div>
        <div className={classes.control}>
          <label className="">Password:</label>
          <input
            type="password"
            label="password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
        </div>
        <div className={classes["actions"]}>
          <button>Update</button>
        </div>
      </form>
    </Card>
  );
};

export default Edit;
