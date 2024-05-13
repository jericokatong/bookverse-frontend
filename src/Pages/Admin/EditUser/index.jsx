import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../../config';
import axios from 'axios';
import Loading from '../../../components/Loading';

const EditUser = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  const signal = controller.signal;
  const { id, name, username } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: name,
    username: username,
  });

  useEffect(() => {
    console.log('dimana', location);
    return () => controller.abort();
  }, [location]);

  const handleEdit = async () => {
    try {
      setIsLoading(true);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.put(`${API}/admin/management-user/${id}`, formData, {
        headers,
        signal,
      });
      const { status, data } = response.data;

      if (status === 'success') {
        navigate('../management-user');
      } else {
        alert(error.response.data.message);
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
      <div className="mb-5">Edit User</div>
      <form className="flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            name="name"
            type="text"
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
        <button
          onClick={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="btn bg-blue-100 w-80 self-end"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
