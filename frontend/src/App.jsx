import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import LoginRegister from "./components/LoginRegister"
import PrivateRoute from "./routes/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import Customer from "./components/dashboard/Customer"
import Product from "./components/dashboard/Product"
import InvoiceList from "./components/dashboard/InvoiceList"
import NewInvoice from "./components/dashboard/NewInvoice"
import Profile from "./components/dashboard/Profile"

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
        <Route
          path="/dashboard/customer"
          element={
            <PrivateRoute>
              <Customer />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/invoicelist"
          element={
            <PrivateRoute>
              <InvoiceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/newinvoice"
          element={
            <PrivateRoute>
              <NewInvoice />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </>
}

export default App
