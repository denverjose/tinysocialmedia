import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import AuthContext from "./store/auth-context";
import PostDetail from "./pages/PostDetail";

function App() {
  const authCtx = useContext(AuthContext);
  const profileId = authCtx.token
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
      {isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route path="/profile/:profileId">
            <Profile />
          </Route>
          <Route path="/edit-profile">
            <EditProfile profileId={profileId}/>
          </Route>
          <Route path="/post/:userId">
            <PostDetail />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </Layout>
  );
}

export default App;
