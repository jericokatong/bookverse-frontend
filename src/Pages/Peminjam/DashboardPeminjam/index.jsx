import React, { useState, useEffect } from 'react';
import { API } from '../../../config';
import axios from 'axios';

const DashboardPeminjam = () => {
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
  return <div>{<p>{data.message}</p>}</div>;
};

export default DashboardPeminjam;
