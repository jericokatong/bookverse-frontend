import React from 'react';

const BuatPinjaman = () => {
  return (
    <div>
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
              <th>Stok Tersedia</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>1</td>
              <td>Pantai dan kehidupan</td>
              <td>Suhartoyo</td>
              <td>10</td>
              <td>
                <button
                  className="btn bg-blue-800 border-none text-white"
                  onClick={() => document.getElementById('my_modal_1').showModal()}
                >
                  PINJAM
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Pinjam!</h3>
                    <p className="py-4">Apakah kamu yakin mau meminjam buku ini ?</p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Yes</button>
                        <button className="btn">No</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>2</td>
              <td>Naruto</td>
              <td>Suditio</td>
              <td>13</td>
              <td>
                <button
                  className="btn bg-blue-800 border-none text-white"
                  onClick={() => document.getElementById('my_modal_1').showModal()}
                >
                  PINJAM
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Pinjam!</h3>
                    <p className="py-4">Apakah kamu yakin mau meminjam buku ini ?</p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Yes</button>
                        <button className="btn">No</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuatPinjaman;
