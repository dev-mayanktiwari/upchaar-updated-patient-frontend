"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Info } from "lucide-react";
import debounce from "lodash/debounce";

// Mock data (replace with actual API call)
const mockTouristPlaces = [
    {
        id: 1,
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        type: "Historical",
        description: "A UNESCO World Heritage Site and an iconic symbol of love.",
        photo: "https://source.unsplash.com/featured/?TajMahal"
    },
    {
        id: 2,
        name: "Jaipur",
        location: "Rajasthan",
        type: "Cultural",
        description: "Known as the Pink City, famous for its palaces and forts.",
        photo: "https://source.unsplash.com/featured/?Jaipur"
    },
    {
        id: 3,
        name: "Goa",
        location: "Goa",
        type: "Beach",
        description: "Famous for its beautiful beaches and vibrant nightlife.",
        photo: "https://source.unsplash.com/featured/?Goa"
    },
    {
        id: 4,
        name: "Varanasi",
        location: "Uttar Pradesh",
        type: "Spiritual",
        description: "One of the oldest living cities in the world, situated on the banks of the Ganges.",
        photo: "https://source.unsplash.com/featured/?Varanasi"
    },
    {
        id: 5,
        name: "Kerala Backwaters",
        location: "Kerala",
        type: "Natural",
        description: "A network of lagoons and canals, perfect for houseboat cruises.",
        photo: "https://source.unsplash.com/featured/?Kerala"
    },
    {
        id: 6,
        name: "Hampi",
        location: "Karnataka",
        type: "Historical",
        description: "A UNESCO World Heritage Site known for its ancient ruins.",
        photo: "https://source.unsplash.com/featured/?Hampi"
    },
    {
        id: 7,
        name: "Mysore Palace",
        location: "Mysore, Karnataka",
        type: "Historical",
        description: "A stunning example of Indo-Saracenic architecture.",
        photo: "https://source.unsplash.com/featured/?MysorePalace"
    },
    {
        id: 8,
        name: "Leh-Ladakh",
        location: "Jammu and Kashmir",
        type: "Adventure",
        description: "Known for its breathtaking landscapes and adventure sports.",
        photo: "https://source.unsplash.com/featured/?LehLadakh"
    },
    {
        id: 9,
        name: "Ranthambore National Park",
        location: "Rajasthan",
        type: "Wildlife",
        description: "Famous for tiger sightings and rich biodiversity.",
        photo: "https://source.unsplash.com/featured/?Ranthambore"
    },
    {
        id: 10,
        name: "Ajanta and Ellora Caves",
        location: "Maharashtra",
        type: "Historical",
        description: "Remarkable rock-cut caves and ancient Buddhist art.",
        photo: "https://source.unsplash.com/featured/?AjantaEllora"
    },
    {
        id: 11,
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        type: "Spiritual",
        description: "A sacred Sikh temple known for its stunning architecture.",
        photo: "https://source.unsplash.com/featured/?GoldenTemple"
    },
    {
        id: 12,
        name: "Darjeeling",
        location: "West Bengal",
        type: "Natural",
        description: "Famous for its tea plantations and scenic views of the Himalayas.",
        photo: "https://source.unsplash.com/featured/?Darjeeling"
    },
    {
        id: 13,
        name: "Jaisalmer",
        location: "Rajasthan",
        type: "Cultural",
        description: "Known as the Golden City, famous for its forts and desert landscapes.",
        photo: "https://source.unsplash.com/featured/?Jaisalmer"
    },
    {
        id: 14,
        name: "Rishikesh",
        location: "Uttarakhand",
        type: "Spiritual",
        description: "A hub for yoga and meditation on the banks of the Ganges.",
        photo: "https://source.unsplash.com/featured/?Rishikesh"
    },
    {
        id: 15,
        name: "Andaman and Nicobar Islands",
        location: "Andaman Sea",
        type: "Beach",
        description: "Famous for pristine beaches and crystal-clear waters.",
        photo: "https://source.unsplash.com/featured/?Andaman"
    },
    {
        id: 16,
        name: "Kolkata",
        location: "West Bengal",
        type: "Cultural",
        description: "Known for its colonial architecture, art galleries, and vibrant culture.",
        photo: "https://source.unsplash.com/featured/?Kolkata"
    },
    {
        id: 17,
        name: "Agra Fort",
        location: "Agra, Uttar Pradesh",
        type: "Historical",
        description: "A UNESCO World Heritage Site and a stunning example of Mughal architecture.",
        photo: "https://source.unsplash.com/featured/?AgraFort"
    },
    {
        id: 18,
        name: "Udaipur",
        location: "Rajasthan",
        type: "Cultural",
        description: "Known as the City of Lakes, famous for its palaces and scenic views.",
        photo: "https://source.unsplash.com/featured/?Udaipur"
    },
    {
        id: 19,
        name: "Jim Corbett National Park",
        location: "Uttarakhand",
        type: "Wildlife",
        description: "The first national park in India, known for its biodiversity.",
        photo: "https://source.unsplash.com/featured/?JimCorbett"
    },
    {
        id: 20,
        name: "Khajuraho Temples",
        location: "Madhya Pradesh",
        type: "Historical",
        description: "Famous for their intricate erotic sculptures and architecture.",
        photo: "https://source.unsplash.com/featured/?Khajuraho"
    },
    {
        id: 21,
        name: "Nashik",
        location: "Maharashtra",
        type: "Spiritual",
        description: "A major pilgrimage center and known for its vineyards.",
        photo: "https://source.unsplash.com/featured/?Nashik"
    },
    {
        id: 22,
        name: "Mahabalipuram",
        location: "Tamil Nadu",
        type: "Historical",
        description: "Famous for its rock-cut temples and sculptures.",
        photo: "https://source.unsplash.com/featured/?Mahabalipuram"
    },
    {
        id: 23,
        name: "Ajmer Sharif Dargah",
        location: "Ajmer, Rajasthan",
        type: "Spiritual",
        description: "A revered Sufi shrine attracting pilgrims from all faiths.",
        photo: "https://source.unsplash.com/featured/?AjmerSharif"
    },
    {
        id: 24,
        name: "Coorg",
        location: "Karnataka",
        type: "Natural",
        description: "Known for its coffee plantations and lush greenery.",
        photo: "https://source.unsplash.com/featured/?Coorg"
    },
    {
        id: 25,
        name: "Shimla",
        location: "Himachal Pradesh",
        type: "Natural",
        description: "A popular hill station known for its colonial architecture.",
        photo: "https://source.unsplash.com/featured/?Shimla"
    },
    {
        id: 26,
        name: "Ooty",
        location: "Tamil Nadu",
        type: "Natural",
        description: "Known as the Queen of Hill Stations, famous for its gardens and lakes.",
        photo: "https://source.unsplash.com/featured/?Ooty"
    },
    {
        id: 27,
        name: "Chennai",
        location: "Tamil Nadu",
        type: "Cultural",
        description: "Known for its classical dance, music, and vibrant culture.",
        photo: "https://source.unsplash.com/featured/?Chennai"
    },
    {
        id: 28,
        name: "Rajasthan Desert",
        location: "Rajasthan",
        type: "Adventure",
        description: "Known for camel safaris and stunning desert landscapes.",
        photo: "https://source.unsplash.com/featured/?RajasthanDesert"
    },
    {
        id: 29,
        name: "Sundarbans",
        location: "West Bengal",
        type: "Wildlife",
        description: "Famous for its mangrove forests and Royal Bengal tigers.",
        photo: "https://source.unsplash.com/featured/?Sundarbans"
    },
    {
        id: 30,
        name: "Kumarakom",
        location: "Kerala",
        type: "Natural",
        description: "A beautiful backwater destination famous for bird watching.",
        photo: "https://source.unsplash.com/featured/?Kumarakom"
    }
];

export default function TouristPlaces() {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = useCallback(
    debounce(async (query) => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace this with an actual API call
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Tourist Places</h2>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by name, location, or type"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {isLoading && <p className="text-center">Loading tourist places...</p>}
      {error && <p className="text-center text-destructive">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <Card key={place.id} className="overflow-hidden">
            <Image
              src={place.photo}
              alt={place.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-primary mb-2">
                {place.name}
              </h3>
              <div className="flex items-center mb-2">
                <MapPin className="text-muted-foreground mr-2 flex-shrink-0" />
                <p className="text-muted-foreground">{place.location}</p>
              </div>
              <div className="flex items-center mb-2">
                <Building className="text-muted-foreground mr-2 flex-shrink-0" />
                <p className="text-muted-foreground">{place.type}</p>
              </div>
              <p className="text-muted-foreground mb-4">{place.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/tourist-place/${place.id}`}>
                  <Info className="mr-2" />
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
