import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Confirm from '../../../components/modal/Confirm';
import axios from 'axios';
import { API } from '../../../config';

const KembalikanBuku = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState('');
  const [idTarget, setIdTarget] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.get(`${API}/peminjam/${localStorage.getItem('id_user')}/book`, {
        headers,
      });
      const { status, data } = response;

      // console.log('data', data.data.id_borrowing);
      console.log('status', status);
      if (status == '200') {
        setData(data);
        if (data) {
          if (data.data.id_borrowing) {
            console.log('ini id borrowing');
            setIdTarget(data.data.id_borrowing);
          }
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log('error : ', error);
      alert(error.response.data.message);
    }
  };

  const handleKembalikan = async () => {
    try {
      setIsLoading(true);
      console.log(localStorage.getItem('acc_token'));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      console.log('id target', idTarget);
      const response = await axios.put(`${API}/peminjam/return/book/${idTarget}`, {}, { headers });
      const { status, data } = response.data;

      if (status === 'success') {
        alert('Berhasil kembalikan buku');
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
      <div>
        <p className=" mb-9">{data.message}</p>
        {data.data && (
          <button className="btn" onClick={() => setOpenModal(true)}>
            KEMBALIKAN BUKU
          </button>
        )}
      </div>
      <Confirm
        isVisible={openModal}
        onClose={() => setOpenModal(false)}
        text="Apakah anda yakin ingin mengembalikan buku ini?"
        onConfirm={handleKembalikan}
      />
    </div>
  );
};

export default KembalikanBuku;
