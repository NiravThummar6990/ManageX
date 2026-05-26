import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"
import Dashboard from "../pages/dashboard"
import Setting from "../pages/setting"
import NotFound from "@/pages/notfound"

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Index
