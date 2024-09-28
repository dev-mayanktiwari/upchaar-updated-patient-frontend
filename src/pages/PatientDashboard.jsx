import { Link } from "react-router-dom";
import ChatbotPopup from "./ChatbotPopup";

function PatientDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Traveller Dashboard
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link
          to="/view-tourist-places"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            View Tourist Places
          </h3>
          <p className="text-gray-600">Find and explore nearby tourist spots</p>
        </Link>
        <Link
          to="/view-hospitals"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            View Hotels
          </h3>
          <p className="text-gray-600">Find and explore nearby hospitals</p>
        </Link>
        <Link
          to="/book-appointment"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            Book Hotel
          </h3>
          <p className="text-gray-600">Schedule a new booking</p>
        </Link>
        <Link
          to="/appointment-status"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            Booking History
          </h3>
          <p className="text-gray-600">
            Check your upcoming and past bookings
          </p>
        </Link>
        <Link
          to="/check-appointment-status"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">Check Bookings</h3>
          <p className="text-gray-600">Check the status of your appointments using booking ID</p>
        </Link>
        <ChatbotPopup />
      </div>
    </div>
  );
}

export default PatientDashboard;
