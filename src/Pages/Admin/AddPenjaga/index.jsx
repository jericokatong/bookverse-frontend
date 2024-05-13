import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../../config';
import Loading from '../../../components/Loading';
import axios from 'axios';

const AddPenjaga = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  const signal = controller.signal;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    console.log('dimana', location);
    return () => controller.abort();
  }, [location]);

  const handleAdd = async () => {
    try {
      setIsLoading(true);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.post(
        `${API}/penjaga`,
        { ...formData, role: 'PENJAGA' },
        { headers, signal },
      );

      const { status, data } = response.data;

      if (status === 'success') {
        navigate('../management-user');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div>
      <Loading status={isLoading} />
      <div className="mb-5">Add Penjaga</div>
      <form className="flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleFormChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            name="username"
            type="text"
            className="grow"
            placeholder="user12"
            value={formData.username}
            onChange={handleFormChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            name="password"
            type="password"
            className="grow"
            value={formData.password}
            onChange={handleFormChange}
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="btn bg-blue-100 w-80 self-end"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPenjaga;
