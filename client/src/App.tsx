import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import AuthPage from "./pages/auth";
import { ThemeProvider } from "./components/theme-provider";
import { FinancialRecordsProvider } from "./context/financial-record-context";
import { AuthGuard } from "./auth/AuthGuard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FinancialRecordsProvider>
        <Router>
          <main className="sm:max-w-lg mx-auto px-5 flex border justify-center items-center relative min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                }
              />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </Router>
      </FinancialRecordsProvider>
    </ThemeProvider>
  );
}

export default App;
