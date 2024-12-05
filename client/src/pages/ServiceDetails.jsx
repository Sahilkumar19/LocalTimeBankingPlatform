import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/serviceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams(); // Extract the id from the URL
  const navigate = useNavigate();
  const [service, setService] = useState(null); // State to hold the specific service
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/services");
        // console.log("Fetched services:", response.data); // Log all fetched data
        // console.log("URL ID:", id);

        // Iterate over the array to find the service with the matching `_id`
        const selectedService = response.data.find(service => service._id === id);

        if (!selectedService) {
          throw new Error("Service not found");
        }

        setService(selectedService); // Update state with the found service
        setLoading(false); // Mark loading as complete
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to load service details. Please try again later.");
        setLoading(false); // Mark loading as complete
      }
    };

    fetchService();
  }, [id]); // Dependency array ensures effect runs when `id` changes

  if (loading) return <div className="service-details-loading">Loading...</div>;
  if (error) return <div className="service-details-error">{error}</div>;

  return (
    <div className="service-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Services
      </button>
      {service ? (
        <div className="service-details-card">
          <h1 className="service-title">{service.title}</h1>
          <p className="service-description">{service.description || "No description available"}</p>
          <div className="service-details-meta">
            <p><strong>Category:</strong> {service.category || "N/A"}</p>
            <p><strong>Credits:</strong> {service.credits || "N/A"}</p>
            <p><strong>Provided by:</strong> {service.userId || "N/A"}</p>
          </div>
        </div>
      ) : (
        <div className="service-details-error">Service details not found.</div>
      )}
    </div>
  );
};

export default ServiceDetails;
