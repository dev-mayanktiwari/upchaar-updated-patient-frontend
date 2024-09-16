import { useState, useEffect } from "react";
import axios from "axios";

function AppointmentStatus() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(
        "http://localhost:3000/api/v1/patient/get-all-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization header
          },
        }
      );
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Appointment Status
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-4 px-4 whitespace-nowrap">
                  {appointment.id}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {appointment.title}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {formatDate(appointment.time)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {formatTime(appointment.time)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.appointmentStatus === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.appointmentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.appointmentStatus}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {appointment.hospitalId}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {appointment.departmentId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {appointments.length === 0 && (
        <p className="text-center py-4 text-gray-500">No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentStatus;
