import React from 'react';

const ListOfBorrowing = () => {
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
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Pantai dan kehidupannya</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mamat Budiman</td>
              <td>Naruto</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfBorrowing;
