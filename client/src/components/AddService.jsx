// AddService.jsx
import { useState } from 'react';
import axios from 'axios';

const AddService = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [credits, setCredits] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://localtimebankingplatform-m2jh.onrender.com/api/services', {
        title,
        description,
        category,
        credits,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Service added!');
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input type="number" value={credits} onChange={(e) => setCredits(e.target.value)} placeholder="Credits" />
      <button onClick={handleSubmit}>Add Service</button>
    </div>
  );
};

export default AddService;
