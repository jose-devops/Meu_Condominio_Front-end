export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const logout = () => {
  removeToken();
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const getTipoAcesso = () => {
  return localStorage.getItem('tipoAcesso');
};