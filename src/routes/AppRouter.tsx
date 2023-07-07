import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Initial, Register } from "../views";
import { Header } from "../components";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="" element={<Initial />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
