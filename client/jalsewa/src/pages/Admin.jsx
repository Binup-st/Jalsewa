import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/admin');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admin data', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (id, value) => {
    setAmounts({ ...amounts, [id]: value });
  };

  const handleSubmit = async (id) => {
    try {
      const amount = parseInt(amounts[id]);
      const response = await axios.put(`admin/${id}`, { amount });
      setAdmins(admins.map(admin => (admin._id === id ? { ...admin, amount: response.data.amount } : admin)));
    } catch (error) {
      console.error('Error updating admin amount', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Admin List</h1>
      <ul className="bg-white shadow overflow-hidden sm:rounded-lg">
        {admins.map(admin => (
          <li key={admin._id} className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <div className='flex flex-col'>
                <span className="font-medium text-gray-900">{admin.username}</span>
                <span className="text-gray-500">{admin.email}</span>
                <span className="text-gray-500">Amount: {admin.amount}</span>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                className="border border-gray-300 p-2 mr-2"
                value={amounts[admin._id] || ''}
                onChange={(e) => handleInputChange(admin._id, e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleSubmit(admin._id)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
