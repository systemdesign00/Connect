// src/components/ApiDeleteComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiDeleteComponent = () => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://serdb.onrender.com/api/Gsestimate')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCheckboxChange = (id) => {
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < data.length) {
      setSelectedIds(data.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    // Start the deletion process
    setDeleting(true);
  };

  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;

    if (deleting) {
      intervalId = setInterval(() => {
        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeleting(false);
          clearInterval(intervalId);
        } else {
          // Delete the first selected item from the API
          const idToDelete = selectedIds[0];

          axios.delete(`https://serdb.onrender.com/api/Gsestimate/${idToDelete}`)
            .then(response => {
              console.log('Deletion successful:', response.data);
              // Update the local data state after deletion
              setData(data.filter(item => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch(error => console.error('Error deleting data:', error));
        }
      }, 1000); // Interval duration in milliseconds (adjust as needed)
    }

    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deleting, selectedIds, data]);

  return (
    <div>
      <button onClick={handleSelectAll} disabled={deleting}>
        Select All
      </button>
      <button onClick={handleDeleteSelected} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete Selected'}
      </button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiDeleteComponent;
