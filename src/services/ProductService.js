import axios from "axios";

const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const getAllProduct = async () => {
  const res = await axiosClient.get(`/product/get-all`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosClient.post(`/product/create`, data);
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axiosClient.get(`/product/get-details/${id}`);
  console.log("res.data", res.data);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosClient.put(`/product/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

// export const deleteProduct = async (id, access_token) => {
//   const res = await axiosJWT.delete(`/product/delete/${id}`, {
//     headers: {
//       token: `Bearer ${access_token}`,
//     },
//   });
//   return res.data;
// };