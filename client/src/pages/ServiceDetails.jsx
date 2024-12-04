// ServiceDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchService();
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>Category: {service.category}</p>
      <p>Credits: {service.credits}</p>
      <p>Provided by: {service.userId}</p>
    </div>
  );
};

export default ServiceDetails;
