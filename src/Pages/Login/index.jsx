import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../config';
import Loading from '../../components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  const signal = controller.signal;
  const [selectedRole, setSelectedRole] = useState('Role');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    console.log('dimana', location);
    return () => controller.abort();
  }, [location]);

  const handleLogin = async (role) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${API}/authentication/login/${role.toLowerCase()}`,
        formData,
        { signal },
      );
      console.log('resp login', response.data);

      const { status, data } = response.data;

      if (status === 'success') {
        localStorage.setItem('ref_token', data.refreshToken);
        localStorage.setItem('role', role.toLowerCase());
        localStorage.setItem('acc_token', data.accessToken);
        localStorage.setItem('id_user', data.id);
        localStorage.setItem('username', data.username);
        navigate(`/dashboard/${role.toLowerCase()}`);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const handleRoleChange = (role, event) => {
    console.log('role', role);
    event.preventDefault();
    setSelectedRole(role);
    setIsDropdownOpen(false);
    setFormData({ ...formData, role: role.toUpperCase() });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Loading status={isLoading} />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6 flex flex-col">
          <div className="rounded-md shadow-sm -space-y-px flex flex-col">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="text"
                required
                value={formData.username}
                onChange={handleFormChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleFormChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="dropdown dropdown-bottom bg-white">
            <div
              onClick={() => {
                setIsDropdownOpen(true);
              }}
              tabIndex={0}
              role="button"
              className="btn w-full bg-white justify-between"
            >
              {selectedRole}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
              >
                <li>
                  <button onClick={(event) => handleRoleChange('Admin', event)}>Admin</button>
                </li>
                <li>
                  <button onClick={(event) => handleRoleChange('Penjaga', event)}>Penjaga</button>
                </li>
                <li>
                  <button onClick={(event) => handleRoleChange('Peminjam', event)}>Peminjam</button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                onClick={() => navigate('/register')}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register akun peminjam
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleLogin(
                  selectedRole === 'Admin'
                    ? 'Admin'
                    : selectedRole === 'Penjaga'
                    ? 'Penjaga'
                    : 'Peminjam',
                );
              }}
              disabled={selectedRole === 'Role'}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v1.586l1.707-1.707a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3A1 1 0 116.293 4.293L8 6.879V5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 11a1 1 0 100 2h5a1 1 0 100-2H5a1 1 0 00-1 1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 15a1 1 0 100 2h4a1 1 0 100-2H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
