
const API_BASE_URL = (import.meta.env.VITE_BACK || 'https://talleresnest.onrender.com');

const request = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const fetchAllProducts = () => request('/producto');
export const fetchProductById = (id) => request(`/producto/${id}`);
export const fetchProductsByIds = (ids = []) => 
  ids.length ? Promise.all(ids.map(fetchProductById)) : fetchAllProducts();