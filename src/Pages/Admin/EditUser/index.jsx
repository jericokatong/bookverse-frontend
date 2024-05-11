import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-5">Edit User</div>
      <form className="flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" placeholder="John Doe" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input type="text" className="grow" placeholder="user12" />
        </label>
        <button
          onClick={() => navigate('../management-user')}
          className="btn bg-blue-100 w-80 self-end"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default EditUser;
