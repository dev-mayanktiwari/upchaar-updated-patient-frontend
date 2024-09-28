import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

// Mock data (replace with actual API call)
const mockTouristPlaces = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    type: "Historical",
    description: "A UNESCO World Heritage Site and an iconic symbol of love.",
    photo:
      "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Jaipur",
    location: "Rajasthan",
    type: "Cultural",
    description: "Known as the Pink City, famous for its palaces and forts.",
    photo:
      "https://images.unsplash.com/photo-1524229648276-e66561fe45a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFpcHVyfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Goa",
    location: "Goa",
    type: "Beach",
    description: "Famous for its beautiful beaches and vibrant nightlife.",
    photo:
      "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Varanasi",
    location: "Uttar Pradesh",
    type: "Spiritual",
    description:
      "One of the oldest living cities in the world, situated on the banks of the Ganges.",
    photo:
      "https://images.unsplash.com/photo-1614164948797-f5e92b825a62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    name: "Kerala Backwaters",
    location: "Kerala",
    type: "Natural",
    description:
      "A network of lagoons and canals, perfect for houseboat cruises.",
    photo:
      "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VyYWxhJTIwYmFja3dhdGVyfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Hampi",
    location: "Karnataka",
    type: "Historical",
    description: "A UNESCO World Heritage Site known for its ancient ruins.",
    photo:
      "https://plus.unsplash.com/premium_photo-1661915320026-84ca2c96faa7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 7,
    name: "Mysore Palace",
    location: "Mysore, Karnataka",
    type: "Historical",
    description: "A stunning example of Indo-Saracenic architecture.",
    photo: "https://source.unsplash.com/featured/?MysorePalace",
  },
  {
    id: 8,
    name: "Leh-Ladakh",
    location: "Jammu and Kashmir",
    type: "Adventure",
    description: "Known for its breathtaking landscapes and adventure sports.",
    photo: "https://source.unsplash.com/featured/?LehLadakh",
  },
  {
    id: 9,
    name: "Ranthambore National Park",
    location: "Rajasthan",
    type: "Wildlife",
    description: "Famous for tiger sightings and rich biodiversity.",
    photo: "https://source.unsplash.com/featured/?Ranthambore",
  },
  {
    id: 10,
    name: "Ajanta and Ellora Caves",
    location: "Maharashtra",
    type: "Historical",
    description: "Remarkable rock-cut caves and ancient Buddhist art.",
    photo: "https://source.unsplash.com/featured/?AjantaEllora",
  },
  {
    id: 11,
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    type: "Spiritual",
    description: "A sacred Sikh temple known for its stunning architecture.",
    photo: "https://source.unsplash.com/featured/?GoldenTemple",
  },
  {
    id: 12,
    name: "Darjeeling",
    location: "West Bengal",
    type: "Natural",
    description:
      "Famous for its tea plantations and scenic views of the Himalayas.",
    photo: "https://source.unsplash.com/featured/?Darjeeling",
  },
  {
    id: 13,
    name: "Jaisalmer",
    location: "Rajasthan",
    type: "Cultural",
    description:
      "Known as the Golden City, famous for its forts and desert landscapes.",
    photo: "https://source.unsplash.com/featured/?Jaisalmer",
  },
  {
    id: 14,
    name: "Rishikesh",
    location: "Uttarakhand",
    type: "Spiritual",
    description: "A hub for yoga and meditation on the banks of the Ganges.",
    photo: "https://source.unsplash.com/featured/?Rishikesh",
  },
  {
    id: 15,
    name: "Andaman and Nicobar Islands",
    location: "Andaman Sea",
    type: "Beach",
    description: "Famous for pristine beaches and crystal-clear waters.",
    photo: "https://source.unsplash.com/featured/?Andaman",
  },
  {
    id: 16,
    name: "Kolkata",
    location: "West Bengal",
    type: "Cultural",
    description:
      "Known for its colonial architecture, art galleries, and vibrant culture.",
    photo: "https://source.unsplash.com/featured/?Kolkata",
  },
  {
    id: 17,
    name: "Agra Fort",
    location: "Agra, Uttar Pradesh",
    type: "Historical",
    description:
      "A UNESCO World Heritage Site and a stunning example of Mughal architecture.",
    photo: "https://source.unsplash.com/featured/?AgraFort",
  },
  {
    id: 18,
    name: "Udaipur",
    location: "Rajasthan",
    type: "Cultural",
    description:
      "Known as the City of Lakes, famous for its palaces and scenic views.",
    photo: "https://source.unsplash.com/featured/?Udaipur",
  },
  {
    id: 19,
    name: "Jim Corbett National Park",
    location: "Uttarakhand",
    type: "Wildlife",
    description:
      "The first national park in India, known for its biodiversity.",
    photo: "https://source.unsplash.com/featured/?JimCorbett",
  },
  {
    id: 20,
    name: "Khajuraho Temples",
    location: "Madhya Pradesh",
    type: "Historical",
    description:
      "Famous for their intricate erotic sculptures and architecture.",
    photo: "https://source.unsplash.com/featured/?Khajuraho",
  },
  {
    id: 21,
    name: "Nashik",
    location: "Maharashtra",
    type: "Spiritual",
    description: "A major pilgrimage center and known for its vineyards.",
    photo: "https://source.unsplash.com/featured/?Nashik",
  },
  {
    id: 22,
    name: "Mahabalipuram",
    location: "Tamil Nadu",
    type: "Historical",
    description: "Famous for its rock-cut temples and sculptures.",
    photo: "https://source.unsplash.com/featured/?Mahabalipuram",
  },
  {
    id: 23,
    name: "Ajmer Sharif Dargah",
    location: "Ajmer, Rajasthan",
    type: "Spiritual",
    description: "A revered Sufi shrine attracting pilgrims from all faiths.",
    photo: "https://source.unsplash.com/featured/?AjmerSharif",
  },
  {
    id: 24,
    name: "Coorg",
    location: "Karnataka",
    type: "Natural",
    description: "Known for its coffee plantations and lush greenery.",
    photo: "https://source.unsplash.com/featured/?Coorg",
  },
  {
    id: 25,
    name: "Shimla",
    location: "Himachal Pradesh",
    type: "Natural",
    description: "A popular hill station known for its colonial architecture.",
    photo: "https://source.unsplash.com/featured/?Shimla",
  },
  {
    id: 26,
    name: "Ooty",
    location: "Tamil Nadu",
    type: "Natural",
    description:
      "Known as the Queen of Hill Stations, famous for its gardens and lakes.",
    photo: "https://source.unsplash.com/featured/?Ooty",
  },
  {
    id: 27,
    name: "Chennai",
    location: "Tamil Nadu",
    type: "Cultural",
    description: "Known for its classical dance, music, and vibrant culture.",
    photo: "https://source.unsplash.com/featured/?Chennai",
  },
  {
    id: 28,
    name: "Rajasthan Desert",
    location: "Rajasthan",
    type: "Adventure",
    description: "Known for camel safaris and stunning desert landscapes.",
    photo: "https://source.unsplash.com/featured/?RajasthanDesert",
  },
  {
    id: 29,
    name: "Sundarbans",
    location: "West Bengal",
    type: "Wildlife",
    description: "Famous for its mangrove forests and Royal Bengal tigers.",
    photo: "https://source.unsplash.com/featured/?Sundarbans",
  },
  {
    id: 30,
    name: "Kumarakom",
    location: "Kerala",
    type: "Natural",
    description: "A beautiful backwater destination famous for bird watching.",
    photo: "https://source.unsplash.com/featured/?Kumarakom",
  },
];

function TouristPlaces() {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState(mockTouristPlaces);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = useCallback(
    debounce((query) => {
      setIsLoading(true);
      setError(null);
      try {
        const filteredPlaces = mockTouristPlaces.filter(
          (place) =>
            place.name.toLowerCase().includes(query.toLowerCase()) ||
            place.location.toLowerCase().includes(query.toLowerCase()) ||
            place.type.toLowerCase().includes(query.toLowerCase())
        );
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Error fetching tourist places:", error);
        setError("Failed to fetch tourist places. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchPlaces(searchTerm);
  }, [searchTerm, fetchPlaces]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Tourist Places
      </h2>
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by name, location, or type"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      {isLoading && (
        <p style={{ textAlign: "center" }}>Loading tourist places...</p>
      )}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {places.map((place) => (
          <div
            key={place.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={place.photo}
              alt={place.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {place.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>📍</span>
                <p>{place.location}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>🏛️</span>
                <p>{place.type}</p>
              </div>
              <p style={{ marginBottom: "1rem" }}>{place.description}</p>
              <Link
                to={`/tourist-place/taj-mahal`}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  textAlign: "center",
                  width: "100%",
                }}
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

export default TouristPlaces;
