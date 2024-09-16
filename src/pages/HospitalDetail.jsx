import { useEffect, useState } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBed,
  FaUserMd,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

function HospitalDetails() {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      if (!id) {
        setError("No hospital ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/hospital/get-hospital-detail/${id}`
        );
        setHospital(response.data.hospital);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
        setError("Failed to fetch hospital details. Please try again.");
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading hospital details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!hospital) {
    return <div className="text-center py-8">No hospital details found.</div>;
  }

  const totalBeds = hospital.beds.totalBeds || "NA";
  const availableBeds = hospital.beds.totalAvailableBeds || "NA";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src="/hopitaldd.jpg"
            alt={hospital.name || "Hospital"}
            className="h-full w-full object-fill"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {hospital.name || "Hospital Name"}
            </h2>
            <div className="flex items-center text-yellow-400 mb-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < (hospital.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-white">{hospital.rating || 0}/5</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  {hospital.location || "N/A"}, {hospital.zipcode || "N/A"}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-blue-500" />
                  {hospital.contact || "N/A"}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2 text-blue-500" />
                  {hospital.email || "N/A"}
                </p>
              </div>
              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1653594192276!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Bed Availability
              </h3>
              <TotalBedsStatusBar
                totalBeds={totalBeds}
                availableBeds={availableBeds}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <BedAvailabilityCard
                  type="ICU"
                  totalBeds={hospital.beds?.icu?.totalBed}
                  availableBeds={hospital.beds?.icu?.availableBed}
                  color="blue"
                />
                <BedAvailabilityCard
                  type="General"
                  totalBeds={hospital.beds?.general?.totalBed}
                  availableBeds={hospital.beds?.general?.availableBed}
                  color="green"
                />
                <BedAvailabilityCard
                  type="Premium"
                  totalBeds={hospital.beds?.premium?.totalBed}
                  availableBeds={hospital.beds?.premium?.availableBed}
                  color="yellow"
                />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-blue-600 mb-4">Departments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hospital.departments?.map((dept, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <FaUserMd className="text-blue-500 text-2xl mb-2" />
                <h4 className="font-bold text-blue-600 mb-1">
                  {dept.name || "N/A"}
                </h4>
                <p className="text-sm text-gray-600">{dept.head || "N/A"}</p>
              </div>
            )) || <p>No departments available</p>}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalBedsStatusBar({ totalBeds, availableBeds }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <h4 className="font-bold text-gray-800 text-xl mb-4">Total Bed Status</h4>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Total Beds:</span>
        <span className="font-semibold">{totalBeds}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Available Beds:</span>
        <span className="font-semibold text-green-600">{availableBeds}</span>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
          <div
            style={{
              width: `${(Number(availableBeds) / Number(totalBeds)) * 100}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </div>
  );
}

function BedAvailabilityCard({ type, totalBeds, availableBeds, color }) {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`font-bold text-${color}-600 text-lg`}>{type}</h4>
        <FaBed className={`text-${color}-500 text-2xl`} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Beds:</span>
          <span className="font-semibold">{totalBeds || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Available:</span>
          <span className="font-semibold text-green-600">
            {availableBeds || "N/A"}
          </span>
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div
              style={{
                width: `${((availableBeds || 0) / (totalBeds || 1)) * 100}%`,
              }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetails;
