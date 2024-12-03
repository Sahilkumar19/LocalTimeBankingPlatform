import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [services, setServices] = useState([]);

  const fetchServices = async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:3001/services', {
        params: filters
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Services</h1>
      <SearchBar onSearch={fetchServices} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
export default Home;