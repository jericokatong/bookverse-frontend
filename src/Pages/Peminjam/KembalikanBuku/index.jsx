import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Confirm from '../../../components/modal/Confirm';
import axios from 'axios';
import { API } from '../../../config';

const KembalikanBuku = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState('');

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

      console.log('data', data);
      console.log('status', status);
      if (status == '200') {
        setData(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log('error : ', error);
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
        onConfirm={() => setIsLoading(true)}
      />
    </div>
  );
};

export default KembalikanBuku;
