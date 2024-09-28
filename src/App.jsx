import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import PatientDashboard from "./pages/PatientDashboard";

import ViewHospitals from "./pages/ViewHospitals";
import BookAppointment from "./pages/BookAppointment";
import AppointmentStatus from "./pages/AppointmentStatus";

import ChatbotPopup from "./pages/ChatbotPopup";
import SignIn from "./pages/SignIn";
import HospitalDetails from "./pages/HospitalDetail";
import { useAuthContext } from "./context/AuthUser";
import AppointmentStatusChecker from "./pages/AppointmentStatusChecker";
import TouristPlaces from "./pages/ViewTouristPlaces";
import TouristPlaceDetails from "./pages/TouristPlaceDetails";

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
            <Route path="/view-tourist-places" element={<TouristPlaces/>} />
            <Route path="/view-hospitals" element={<ViewHospitals />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-status" element={<AppointmentStatus />} />
            <Route path="/tourist-place/taj-mahal" element={<TouristPlaceDetails />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path="/hospitals" element={<ViewHospitals />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route
              path="check-appointment-status"
              element={<AppointmentStatusChecker />}
            />
          </Routes>
        </main>
        <Footer />
        <ChatbotPopup />
      </div>
    </Router>
  );
}

export default App;
