import React from 'react';

const DashboardPenjaga = () => {
  return (
    <div className="w-full flex gap-4">
      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Books</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">10</div>
          </div>
        </div>
      </div>

      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Books Available</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">10</div>
          </div>
        </div>
      </div>

      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Borrowing</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPenjaga;
