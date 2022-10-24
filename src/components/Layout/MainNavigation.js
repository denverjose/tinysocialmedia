import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const profileId = authCtx.token
  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Tiny Social Media</div>
      </Link>
      <nav>
        {isLoggedIn && (
          <ul>
            <li>
              <Link to={`/profile/${profileId}`}>Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
