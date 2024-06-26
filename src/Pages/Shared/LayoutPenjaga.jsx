import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import axios from 'axios';
import Loading from '../../components/Loading';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [actived, setActived] = useState();

  useEffect(() => {
    if (location.pathname === '/dashboard/penjaga') {
      navigate('dashboard-penjaga', { state: location.state });
    }
    setActived(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API}/authentication/logout`, {
        refreshToken: localStorage.getItem('ref_token'),
      });
      console.log(response);
      const { status, data } = response.data;
      if (status === 'success') {
        localStorage.clear();
        navigate('../../login');
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 h-full w-16.5 bg-blue-600 text-white flex flex-col items-start justify-start flex-wrap gap-3">
      <Loading status={isLoading} />
      <div className="py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        ></svg>
      </div>

      <button
        onClick={() => navigate('dashboard-penjaga', { state: location.state })}
        className={`px-2 py-1 text-sm hover:bg-blue-700 w-full text-left ${
          actived === '/dashboard/penjaga/dashboard-penjaga' ? 'bg-blue-700' : ''
        }`}
        style={{ width: '130px' }}
      >
        Dashboard
      </button>

      <button
        onClick={() => navigate('book-management', { state: location.state })}
        className={`px-2 py-1 text-sm hover:bg-blue-700 w-full text-left ${
          actived === '/dashboard/penjaga/book-management' ? 'bg-blue-700' : ''
        }`}
        style={{ width: '130px' }}
      >
        Book Management
      </button>

      <button
        onClick={() => navigate('loan-approval', { state: location.state })}
        className={`px-2 py-1 text-sm hover:bg-blue-700 w-full text-left ${
          actived === '/dashboard/penjaga/loan-approval' ? 'bg-blue-700' : ''
        }`}
        style={{ width: '130px' }}
      >
        Loan Approval
      </button>

      <button
        onClick={() => navigate('list-of-borrowing', { state: location.state })}
        className={`px-2 py-1 text-sm hover:bg-blue-700 w-full text-left ${
          actived === '/dashboard/penjaga/list-of-borrowing' ? 'bg-blue-700' : ''
        }`}
        style={{ width: '130px' }}
      >
        List of Borrowing
      </button>

      <button
        onClick={handleLogout}
        className="px-2 py-1 text-sm hover:bg-blue-700 w-full mt-auto text-left"
      >
        Logout
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <div className="fixed top-0 z-10 left-0 w-full bg-blue-800 text-white p-4 flex justify-between">
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
        <p>Bookverse</p>
      </div>
      <div>
        <p>{localStorage.getItem('username')}</p>
      </div>
    </div>
  );
};

const LayoutPenjaga = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16.5 flex flex-col w-full min-h-screen">
        {/* Header */}
        <Header />
        {/* Konten */}
        <div className="p-4 mt-16" style={{ paddingLeft: '150px' }}>
          {/* Konten yang bisa diganti */}
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default LayoutPenjaga;
