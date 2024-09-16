import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import debounce from "lodash/debounce";

function ViewHospitals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHospitals = useCallback(
    debounce(async (query) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/hospital/search?query=${query}`
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setError("Failed to fetch hospitals. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchHospitals(searchTerm);
  }, [searchTerm, fetchHospitals]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Nearby Hospitals
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, location, or zipcode"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {isLoading && <p className="text-center">Loading hospitals...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <img
              src="/hospital.avif"
              alt={hospital.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {hospital.name}
              </h3>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-gray-500 mr-2 flex-shrink-0" />
                <p className="text-gray-600">{hospital.location}</p>
              </div>
              <p className="text-gray-600 mb-2">Zipcode: {hospital.zipcode}</p>
              <div className="flex items-center mb-2">
                <FaPhone className="text-gray-500 mr-2 flex-shrink-0" />
                <p className="text-gray-600">{hospital.contact}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-gray-500 mr-2 flex-shrink-0" />
                <p className="text-gray-600">{hospital.email}</p>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < hospital.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <div className="mb-4 flex-grow">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Departments:
                </h4>
                <ul className="list-disc list-inside">
                  {hospital.departments.map((dept) => (
                    <li key={dept.id} className="text-gray-600">
                      {dept.name} - {dept.head}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/hospital/${hospital.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block text-center mt-auto"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewHospitals;
