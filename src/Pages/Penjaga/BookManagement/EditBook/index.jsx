import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../../config';

const EditBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;
  const { id, judul_buku, nama_pengarang, penerbit, tahun_terbit, isbn, jumlah_tersedia } =
    location.state;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul_buku,
    nama_pengarang,
    penerbit,
    tahun_terbit,
    isbn,
    jumlah_tersedia,
  });

  useEffect(() => {
    console.log('dimana', location);
    return () => controller.abort();
  }, [location]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log('form data', formData);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
      };
      const response = await axios.put(
        `${API}/book/${id}`,
        {
          judul_buku: formData.judul_buku,
          nama_pengarang: formData.nama_pengarang,
          penerbit: formData.penerbit,
          tahun_terbit: parseInt(formData.tahun_terbit),
          isbn: formData.isbn,
          jumlah_tersedia: parseInt(formData.jumlah_tersedia),
        },
        { headers, signal },
      );

      const { status, data } = response.data;

      if (status === 'success') {
        alert('Buku berhasil diperbarui');
        setFormData({
          judul_buku: '',
          nama_pengarang: '',
          penerbit: '',
          tahun_terbit: 0,
          isbn: '',
          jumlah_tersedia: 0,
        });
        navigate('../book-management');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log('error add buku', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div className="flex flex-col">
      <Loading status={isLoading} />
      <h1 className="mb-10 text-4xl text-blue-700 font-semibold">Edit Buku</h1>
      <div className="form-control shadow-2xl mb-5 flex-1 p-3 border-4 border-blue-500 bg-base-200 rounded-lg">
        <label className="label">
          <span className="label-text">Judul buku</span>
        </label>
        <input
          name="judul_buku"
          type="text"
          autoComplete="text"
          required
          value={formData.judul_buku}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
        <label className="label mt-4">
          <span className="label-text">Nama pengarang</span>
        </label>
        <input
          name="nama_pengarang"
          type="text"
          autoComplete="text"
          required
          value={formData.nama_pengarang}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
        <label className="label mt-4">
          <span className="label-text">Penerbit</span>
        </label>
        <input
          name="penerbit"
          type="text"
          autoComplete="text"
          required
          value={formData.penerbit}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
        <label className="label mt-4">
          <span className="label-text">Tahun terbit</span>
        </label>
        <input
          name="tahun_terbit"
          type="number"
          min={1500}
          minLength={4}
          maxLength={4}
          required
          value={formData.tahun_terbit}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
        <label className="label mt-4">
          <span className="label-text">ISBN</span>
        </label>
        <input
          name="isbn"
          type="text"
          required
          value={formData.isbn}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
        <label className="label mt-4">
          <span className="label-text">Jumlah tersedia</span>
        </label>
        <input
          name="jumlah_tersedia"
          type="number"
          required
          value={formData.jumlah_tersedia}
          onChange={handleFormChange}
          className="input input-bordered"
          placeholder=""
        />
      </div>
      <div className="flex gap-4 self-end">
        <button
          type="reset"
          onClick={() =>
            setFormData({
              judul_buku: '',
              nama_pengarang: '',
              penerbit: '',
              tahun_terbit: 0,
              isbn: '',
              total_stock: 0,
            })
          }
          className="btn text-white btn-error"
        >
          Reset
        </button>
        <button type="submit" onClick={handleSubmit} className="btn text-white btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditBook;
