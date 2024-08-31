import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import AuthPage from "./pages/auth";

function App() {
  return (
    <Router>
      <main className="flex items-center justify-center w-full min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage />
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
