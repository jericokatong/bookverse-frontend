import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../config';

const DashboardPenjaga = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataAwal();
  }, []);

  const getDataAwal = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.get(`${API}/penjaga/summary-book-transaction`, { headers });
      const { status, data } = response.data;

      if (status === 'success') {
        setData(data);
      } else {
        alert(error.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex gap-4">
      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Books</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">{data.countBuku}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Books Available</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">
              {data.jumlahTersedia}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card w-60 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Number of Borrowing</h2>
            <div className="badge border-none bg-gray-500 badge-secondary">
              {data.jumlahMeminjam}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPenjaga;
