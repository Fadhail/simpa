import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from "./components/layouts/LayoutDashboard";
import { Dashboard } from "./pages/Dashboard";
import { PassengerPage } from "./pages/PassengerPage";
import { PlanePage } from "./pages/PlanePage";
import { SchedulePage } from "./pages/SchedulePage";
import { TicketPage } from "./pages/TicketPage";
import { AddPlane } from "./pages/AddPlane";
import { EditPlane } from "./pages/EditPlane";

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
        </Routes>
      </LayoutDashboard>
    </Router>
  );
}