import React, { useState, useEffect } from 'react';
import Confirm from '../../../components/modal/Confirm';
import Loading from '../../../components/Loading';
import axios from 'axios';
import { API } from '../../../config';

const BuatPinjaman = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [idTarget, setIdTarget] = useState('');

  useEffect(() => {
    // console.log('location book-management', location);
    getData();
  }, []);

  const getData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.get(`${API}/book`, { headers });
      const { status, data } = response.data;
      console.log(data.books);
      if (status === 'success') {
        setData(data.books);
      } else {
        alert('error');
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handlePinjam = async () => {
    try {
      setIsLoading(true);
      console.log(localStorage.getItem('acc_token'));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.post(`${API}/peminjam/${idTarget}`, {}, { headers });
      const { status, data } = response.data;

      if (status === 'success') {
        // window.location.reload();
        alert('Berhasil meminjam buku');
      } else {
        alert('error');
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
      <div className="flex justify-between mb-7">
        <div>Buat Pinjaman</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Judul Buku</th>
              <th>Nama Pengarang</th>
              <th>Jumlah Tersedia</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.judul_buku}</td>
                  <td>{item.nama_pengarang}</td>
                  <td>{item.jumlah_tersedia}</td>
                  <td>
                    <button
                      className="btn bg-blue-800 border-none text-white"
                      onClick={() => {
                        setIdTarget(item.id);
                        setOpenModal(true);
                      }}
                    >
                      PINJAM
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
        text="Apakah anda yakin ingin meminjam buku ini?"
        onConfirm={handlePinjam}
      />
    </div>
  );
};

export default BuatPinjaman;
