import "./App.css";
import AppRoutes from "./routes/AppRouter";

function App() {
  // Force Phone Layout
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div
        className={`w-[360px] h-[700px] ${
          window.innerWidth > 600 ? "shadow-2xl rounded-lg overflow-hidden" : ""
        }`}
      >
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
