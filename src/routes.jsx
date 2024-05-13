import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LayoutAdmin from './Pages/Shared/LayoutAdmin';
import ManagementUser from './Pages/Admin/ManagementUser';
import AddPenjaga from './Pages/Admin/AddPenjaga';
import EditUser from './Pages/Admin/EditUser';
import LayoutPenjaga from './Pages/Shared/LayoutPenjaga';
import DashboardPenjaga from './Pages/Penjaga/DashboardPenjaga';
import BookManagement from './Pages/Penjaga/BookManagement';
import LoanApproval from './Pages/Penjaga/LoanApproval';
import ListOfBorrowing from './Pages/Penjaga/ListOfBorrowing';
import LayoutPeminjam from './Pages/Shared/LayoutPeminjam';
import DashboardPeminjam from './Pages/Peminjam/DashboardPeminjam';
import BuatPinjaman from './Pages/Peminjam/BuatPinjaman';
import KembalikanBuku from './Pages/Peminjam/KembalikanBuku';
import AddBook from './Pages/Penjaga/BookManagement/AddBook';
import EditBook from './Pages/Penjaga/BookManagement/EditBook';
import { getAuthToken } from './auth';

const AppRoutes = () => {
  const PrivateRoute = ({ element }) => {
    return getAuthToken() ? element : <Navigate to="/login" replace />;
  };

  console.log('haha', getAuthToken());

  return (
    <Routes>
      <Route
        path="/"
        element={
          getAuthToken() ? (
            <Navigate to={`/dashboard/${localStorage.getItem('role')}`} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route path="/dashboard/admin" element={<PrivateRoute element={<LayoutAdmin />} />}>
        <Route path="management-user" element={<ManagementUser />} />
        <Route path="management-user/add-penjaga" element={<AddPenjaga />} />
        <Route path="management-user/edit-user" element={<EditUser />} />
      </Route>

      {/* Penjaga */}
      <Route path="/dashboard/penjaga" element={<LayoutPenjaga />}>
        <Route path="dashboard-penjaga" element={<DashboardPenjaga />} />
        <Route path="book-management" element={<BookManagement />} />
        <Route path="book-management/add-book" element={<AddBook />} />
        <Route path="book-management/edit-book" element={<EditBook />} />
        <Route path="loan-approval" element={<LoanApproval />} />
        <Route path="list-of-borrowing" element={<ListOfBorrowing />} />
      </Route>

      {/* Peminjam */}
      <Route path="/dashboard/peminjam" element={<PrivateRoute element={<LayoutPeminjam />} />}>
        <Route path="dashboard-peminjam" element={<DashboardPeminjam />} />
        <Route path="buat-pinjaman" element={<BuatPinjaman />} />
        <Route path="kembalikan-buku" element={<KembalikanBuku />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
