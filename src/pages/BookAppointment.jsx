import { useState, useEffect } from "react";
import axios from "axios";

function BookAppointment() {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      const hospital = hospitals.find(
        (h) => h.id === parseInt(selectedHospital),
      );
      setDepartments(hospital ? hospital.departments : []);
    } else {
      setDepartments([]);
    }
  }, [selectedHospital, hospitals]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(lowercasedQuery),
    );
    setFilteredHospitals(filtered);
  }, [searchQuery, hospitals]);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/hospital/search?query=",
      );
      setHospitals(response.data);
      setFilteredHospitals(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch hospitals");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      hospitalId: parseInt(selectedHospital),
      departmentId: parseInt(department),
      title: "Appointment",
      time: `${date}T${time}:00Z`,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/v1/patient/book-appointment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        },
      );
      alert("Appointment booked successfully!");
      // Reset form
      setSelectedHospital("");
      setDepartment("");
      setDate("");
      setTime("");
      setSearchQuery("");
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.error || "Failed to book appointment";
      setError(errorMessage);
    }
    setLoading(false);
  };

  const getNextFiveDates = () => {
    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00"];

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Book an Appointment
      </h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hospital"
          >
            Hospital:
          </label>
          <div className="relative">
            <input
              type="text"
              id="hospitalSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Search hospitals..."
            />
            <select
              id="hospital"
              value={selectedHospital}
              onChange={(e) => {
                setSelectedHospital(e.target.value);
                setSearchQuery("");
              }}
              required
              className="w-full p-2 border rounded-md mt-2"
            >
              <option value="">Select a hospital</option>
              {filteredHospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department"
          >
            Department:
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date:
          </label>
          <select
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a date</option>
            {getNextFiveDates().map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Time:
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
