import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Confirm from '../../../components/modal/Confirm';
import { API } from '../../../config';
import axios from 'axios';

const LoanApproval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [idTarget, setIdTarget] = useState('');
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
      const response = await axios.get(`${API}/penjaga/request-book`, { headers });
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

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      console.log(localStorage.getItem('acc_token'));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.put(
        `${API}/penjaga/approve/request-book/${idTarget}`,
        {},
        { headers },
      );
      const { status, data } = response.data;

      if (status === 'success') {
        // window.location.reload();
        alert('berhasil approve peminjaman');
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

  const handleReject = async () => {
    try {
      setIsLoading(true);
      console.log(localStorage.getItem('acc_token'));
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.put(
        `${API}/penjaga/reject/request-book/${idTarget}`,
        {},
        { headers },
      );
      const { status, data } = response.data;

      if (status === 'success') {
        // window.location.reload();
        alert('Berhasil reject peminjamn');
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
      <div className="flex justify-between mb-7">
        <div>Loan Approval</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nama Peminjam</th>
              <th>Judul Buku</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_peminjam}</td>
                  <td>{item.judul_buku}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIdTarget(item.id);
                        setOpenModal(true);
                      }}
                      className="btn btn-sm btn-circle bg-transparent border-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-6 h-6 fill-primary"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-sm btn-circle bg-transparent border-none"
                      onClick={() => {
                        setIdTarget(item.id);
                        setOpenModal1(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-6 h-6 fill-error"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clip-rule="evenodd"
                        />
                      </svg>
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
        text="Apakah anda yakin ingin menyetujui permintaan ini?"
        onConfirm={handleApprove}
      />
      <Confirm
        isVisible={openModal1}
        onClose={() => setOpenModal1(false)}
        text="Apakah anda yakin ingin menolak permintaan ini?"
        onConfirm={handleReject}
      />
    </div>
  );
};

export default LoanApproval;
