import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import ViewHospitals from "./pages/ViewHospitals";
import BookAppointment from "./pages/BookAppointment";
import AppointmentStatus from "./pages/AppointmentStatus";
import Medication from "./pages/Medication";
import ManageDepartments from "./pages/ManageDepartments";
import ManageAppointments from "./pages/ManageAppointments";
import InventoryManagement from "./pages/InventoryManagement";
import BedManagement from "./pages/BedManagement";
import ChatbotPopup from "./pages/ChatbotPopup";
import SignIn from "./pages/SignIn";
import HospitalDetails from "./pages/HospitalDetail";
import { useAuthContext } from "./context/AuthUser";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            <Route path="/view-hospitals" element={<ViewHospitals />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-status" element={<AppointmentStatus />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/manage-departments" element={<ManageDepartments />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/manage-appointments"
              element={<ManageAppointments />}
            />
            <Route
              path="/inventory-management"
              element={<InventoryManagement />}
            />
            <Route path="/bed-management" element={<BedManagement />} />
            <Route path="/hospitals" element={<ViewHospitals />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotPopup />
      </div>
    </Router>
  );
}

export default App;
