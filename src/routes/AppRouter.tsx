import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Community, Initial, Register } from "../views";
import { Header } from "../components";
import LogIn from "../views/Login/Login";
import Post from "../views/Post/Post";
import CreatePost from "../views/CreatePost/CreatePost";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="/community/:communityName" element={<Community />} />
        <Route
          path="/community/:communityName/post/:postId"
          element={<Post />}
        />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="" element={<Initial />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
