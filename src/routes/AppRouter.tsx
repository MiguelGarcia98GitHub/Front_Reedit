import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Community, Initial, Register } from "../views";
import { Header } from "../components";
import LogIn from "../views/Login/Login";
import Post from "../views/Post/Post";
import CreatePost from "../views/CreatePost/CreatePost";
import { useStore } from "../store/zustandStore";
import ExploreCommunities from "../views/ExploreCommunities/ExploreCommunities";
import CreateCommunity from "../views/CreateCommunity/CreateCommunity";

const AppRouter = () => {
  const { logged } = useStore();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="explore-communities" element={<ExploreCommunities />} />

        <Route path="/community/:communityName" element={<Community />} />
        <Route
          path="/community/:communityName/post/:postId"
          element={<Post />}
        />
        <Route
          path="create-community"
          element={
            logged ? <CreateCommunity /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/create-post"
          element={logged ? <CreatePost /> : <Navigate to="/login" replace />}
        />
        <Route path="" element={<Initial />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
