import { useState } from "react";
import axios from "axios";

function AppointmentStatusChecker() {
  const [appointmentId, setAppointmentId] = useState("");
  const [status, setStatus] = useState(null);
  const [queue, setQueue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);
    setQueue(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/patient/check-appointment-status/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(response.data.status);
      if (response.data.status === "Confirmed") {
        setQueue(response.data.queue);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch appointment status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Check Appointment Status
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="appointmentId"
            className="block text-sm font-medium text-gray-700"
          >
            Appointment ID
          </label>
          <input
            type="text"
            id="appointmentId"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter appointment ID"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {status && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Appointment Status</h3>
          <p
            className={`text-lg font-bold ${
              status === "Confirmed"
                ? "text-green-600"
                : status === "Pending"
                ? "text-yellow-600"
                : "text-blue-600"
            }`}
          >
            {status}
          </p>

          {status === "Confirmed" && queue && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Queue Information</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Your position: {queue.userPosition}</li>
                <li>People ahead of you: {queue.peopleAhead}</li>
                <li>Total queue length: {queue.totalQueueLength}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AppointmentStatusChecker;
