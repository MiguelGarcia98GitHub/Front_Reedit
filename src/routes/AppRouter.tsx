import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Initial, Register } from "../views";
import { Header } from "../components";
import LogIn from "../views/Login/Login";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="" element={<Initial />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
