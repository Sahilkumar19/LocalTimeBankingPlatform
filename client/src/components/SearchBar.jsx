import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search services..."
        className="border rounded p-2 flex-grow"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">All Categories</option>
        <option value="education">Education</option>
        <option value="household">Household</option>
        <option value="professional">Professional</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
export default SearchBar;