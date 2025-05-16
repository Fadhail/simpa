import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from "./components/layouts/LayoutDashboard";
import { Dashboard } from "./pages/Dashboard";
import { PassengerPage } from "./pages/PassengerPage";
import { PlanePage } from "./pages/PlanePage";
import { SchedulePage } from "./pages/SchedulePage";
import { TicketPage } from "./pages/TicketPage";
import { AddPlane } from "./pages/AddPlane";
import { EditPlane } from "./pages/EditPlane";
import { AddPassenger } from "./pages/AddPassenger";
import { EditPassenger } from "./pages/EditPassenger";
import { AddSchedule } from "./pages/AddSchedule";
import { EditSchedule } from "./pages/EditSchedule";

export default function App() {
  return (
    <Router>
      <LayoutDashboard>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/passengers" element={<PassengerPage />} />
          <Route path="/planes" element={<PlanePage />} />
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/planes/add" element={<AddPlane />} />
          <Route path="/planes/edit/:kodePesawat" element={<EditPlane />} />
          <Route path="/passengers/add" element={<AddPassenger />} />
          <Route path="/passengers/edit/:nik" element={<EditPassenger />} />
          <Route path="/schedules/add" element={<AddSchedule />} />
          <Route path="/schedules/edit/:kodePenerbangan" element={<EditSchedule />} />
        </Routes>
      </LayoutDashboard>
    </Router>
  );
}