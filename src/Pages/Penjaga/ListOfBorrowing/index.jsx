import React, { useState, useEffect } from 'react';
import { API } from '../../../config';
import axios from 'axios';

const ListOfBorrowing = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log('location book-management', location);
    getData();
  }, []);

  const getData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.get(`${API}/penjaga/list-borrower`, { headers });
      const { status, data } = response.data;
      console.log(data);
      if (status === 'success') {
        setData(data);
      } else {
        alert(error.response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between mb-7">
        <div className=" font-semibold mb-4">List Of Borrowing</div>
        <p>Yang sedang meminjam buku</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nama Peminjam</th>
              <th>Buku yang dipinjam</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_peminjam}</td>
                  <td>{item.buku_yang_dipinjam}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfBorrowing;
