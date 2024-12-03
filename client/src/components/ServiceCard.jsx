import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold">{service.title}</h3>
      <p className="text-gray-600">{service.category}</p>
      <p className="text-blue-600 font-bold">{service.credits} credits</p>
      <Link to={`/service/${service._id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}
export default ServiceCard;