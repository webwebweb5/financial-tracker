import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import AuthPage from "./pages/auth";
import { ThemeProvider } from "./components/theme-provider";
import { FinancialRecordsProvider } from "./context/financial-record-context";
import PaymentPage from "./components/record-table";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className="flex justify-center w-full min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <FinancialRecordsProvider>
                  <DashboardPage />
                </FinancialRecordsProvider>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
