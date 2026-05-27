import Dashboard from "@/pages/dashboard"
import Calendar from "@/pages/dashboard/calender"
import CompleteTask from "@/pages/dashboard/completeTask"
import DashboardHome from "@/pages/dashboard/dashboardHome"
import InProgress from "@/pages/dashboard/inProgress"
import MyTasks from "@/pages/dashboard/myTasks"
import Home from "@/pages/home"
import Login from "@/pages/login"
import NotFound from "@/pages/notfound"
import Register from "@/pages/register"
import Setting from "@/pages/setting"
import { Route, Routes } from "react-router-dom"

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="mytasks" element={<MyTasks />} />
        <Route path="inprogress" element={<InProgress />} />
        <Route path="complete" element={<CompleteTask />} />
        <Route path="calender" element={<Calendar />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Index
