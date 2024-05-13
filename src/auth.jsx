export const getAuthToken = () => {
  const token = localStorage.getItem('ref_token');
  const role = localStorage.getItem('role');

  if (!token || !role) {
    return null;
  } else {
    return { token, role };
  }
};
