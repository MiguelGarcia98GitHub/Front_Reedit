import "./App.css";
import AppRoutes from "./routes/AppRouter";

function App() {
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
