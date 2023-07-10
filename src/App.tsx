import "./App.css";
import { baseBackendURL } from "./config/globals";
import AppRoutes from "./routes/AppRouter";

function App() {
  console.log("app env variable");
  console.log(baseBackendURL);

  // Force Phone Layout
  return (
    <div className="flex items-center justify-center">
      <div className={`w-[360px] h-[700px]`}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
