import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from "./components/layouts/LayoutDashboard";
import { Dashboard } from "./pages/Dashboard";
import { PassengerPage } from "./pages/PassengerPage";
import { PlanePage } from "./pages/PlanePage";
import { SchedulePage } from "./pages/SchedulePage";
import { TicketPage } from "./pages/TicketPage";

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
        </Routes>
      </LayoutDashboard>
    </Router>
  );
}