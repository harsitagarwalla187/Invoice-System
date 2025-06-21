import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import LoginRegister from "./components/LoginRegister"
import PrivateRoute from "./routes/PrivateRoute"
import Dashboard from "./pages/Dashboard"

function App() {
  return <>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </>
}

export default App
