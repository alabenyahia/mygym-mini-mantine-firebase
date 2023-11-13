import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AppDesktopLayout from "../layouts/AppDesktopLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppDesktopLayout />} />
      <Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
