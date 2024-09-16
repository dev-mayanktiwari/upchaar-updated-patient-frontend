function AppointmentStatus() {
  const appointments = [
    {
      id: 1,
      department: "Cardiology",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      department: "Neurology",
      date: "2023-06-20",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      department: "Orthopedics",
      date: "2023-06-25",
      time: "11:15 AM",
      status: "Completed",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Appointment Status
      </h2>
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {appointment.department}
            </h3>
            <p className="text-gray-600 mb-1">Date: {appointment.date}</p>
            <p className="text-gray-600 mb-1">Time: {appointment.time}</p>
            <p
              className={`font-bold ${
                appointment.status === "Confirmed"
                  ? "text-green-600"
                  : appointment.status === "Pending"
                  ? "text-yellow-600"
                  : "text-blue-600"
              }`}
            >
              Status: {appointment.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentStatus;
