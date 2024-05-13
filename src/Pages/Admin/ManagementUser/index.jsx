import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Confirm from '../../../components/modal/Confirm';
import axios from 'axios';
import { API } from '../../../config';

const ManagementUser = () => {
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;
  const [idTarget, setIdTarget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    console.log('dimana', location);
    return () => controller.abort();
  }, [location]);

  const getDataUser = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.get(`${API}/admin/management-user`, { headers });
      const { status, data } = response.data;

      if (status === 'success') {
        setDataUser(data.users);
      } else {
        alert(error.response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.delete(`${API}/admin/management-user/${idTarget}`, { headers });
      const { status, data } = response.data;

      if (status === 'success') {
        // window.location.reload();
        alert('Berhasil delete');
      } else {
        alert(error.response.data.message);
      }
      setOpenModal(false);
      setIsLoading(false);
    } catch (error) {
      setOpenModal(false);
      setIsLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Loading status={isLoading} />
      <div className="flex justify-between">
        <div>Management User</div>
        <div>
          <button onClick={() => navigate('add-penjaga')} className="btn">
            Add Penjaga
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser &&
              dataUser.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate('edit-user', {
                          state: { id: item.id, name: item.name, username: item.username },
                        })
                      }
                      className="btn bg-transparent border-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                    <button
                      className="btn bg-transparent border-none"
                      onClick={() => {
                        setIdTarget(item.id);
                        setOpenModal(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Confirm
        isVisible={openModal}
        onClose={() => setOpenModal(false)}
        text="Apakah anda yakin ingin menghapus user ini?"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManagementUser;
