import { Link } from "react-router-dom";
import ChatbotPopup from "./ChatbotPopup";

function PatientDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Patient Dashboard
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/view-hospitals"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            View Hospitals
          </h3>
          <p className="text-gray-600">Find and explore nearby hospitals</p>
        </Link>
        <Link
          to="/book-appointment"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            Book Appointment
          </h3>
          <p className="text-gray-600">Schedule a new appointment</p>
        </Link>
        <Link
          to="/appointment-status"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            Appointment Status
          </h3>
          <p className="text-gray-600">
            Check your upcoming and past appointments
          </p>
        </Link>
        <Link
          to="/medication"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">Medication</h3>
          <p className="text-gray-600">View and manage your prescriptions</p>
        </Link>
        <ChatbotPopup />
      </div>
    </div>
  );
}

export default PatientDashboard;
