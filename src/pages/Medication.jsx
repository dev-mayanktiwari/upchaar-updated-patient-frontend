function Medication() {
  const medications = [
    {
      id: 1,
      name: "Aspirin",
      dosage: "100mg",
      frequency: "Once daily",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Twice daily",
      startDate: "2023-06-01",
      endDate: "2023-07-31",
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg",
      frequency: "With meals",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Your Medications
      </h2>
      <div className="grid gap-6">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {medication.name}
            </h3>
            <p className="text-gray-600 mb-1">Dosage: {medication.dosage}</p>
            <p className="text-gray-600 mb-1">
              Frequency: {medication.frequency}
            </p>
            <p className="text-gray-600 mb-1">
              Start Date: {medication.startDate}
            </p>
            <p className="text-gray-600">End Date: {medication.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Medication;
