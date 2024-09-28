import React from "react";
import { Link } from "react-router-dom";

// Hardcoded Taj Mahal details
const tajMahalDetails = {
  id: 1,
  name: "Taj Mahal",
  location: "Agra, Uttar Pradesh",
  type: "Historical",
  description: "A UNESCO World Heritage Site and an iconic symbol of love.",
  photo:
    "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
  longDescription:
    "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
  openingHours: "6:00 AM to 7:00 PM (Closed on Fridays)",
  entryFee: "1000 INR for foreign tourists, 40 INR for Indian citizens",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Agra Fort", "Fatehpur Sikri", "Akbar's Tomb"],
  reviews: [
    {
      user: "John D.",
      rating: 5,
      comment: "Breathtaking architecture and a must-visit place!",
    },
    {
      user: "Sarah M.",
      rating: 4,
      comment: "Beautiful, but very crowded. Go early in the morning.",
    },
  ],
};

export default function TouristPlaceDetails() {
  const place = tajMahalDetails;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        &larr; Back to Tourist Places
      </Link>
      <h1 className="text-4xl font-bold mb-4">{place.name}</h1>
      <img
        src={place.photo}
        alt={place.name}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between mb-4">
        <p>
          <strong>Location:</strong> {place.location}
        </p>
        <p>
          <strong>Type:</strong> {place.type}
        </p>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Description</h2>
      <p className="mb-4">{place.longDescription}</p>
      <h2 className="text-2xl font-semibold mb-2">Visitor Information</h2>
      <ul className="mb-4 list-disc list-inside">
        <li>
          <strong>Opening Hours:</strong> {place.openingHours}
        </li>
        <li>
          <strong>Entry Fee:</strong> {place.entryFee}
        </li>
        <li>
          <strong>Best Time to Visit:</strong> {place.bestTimeToVisit}
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Nearby Attractions</h2>
      <ul className="mb-4 list-disc list-inside">
        {place.nearbyAttractions.map((attraction, index) => (
          <li key={index}>{attraction}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      {place.reviews.map((review, index) => (
        <div key={index} className="mb-4 border border-gray-200 p-4 rounded-lg">
          <p>
            <strong>{review.user}</strong> - Rating: {review.rating}/5
          </p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
