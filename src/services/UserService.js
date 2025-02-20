import axios from 'axios'

// Tạo instance axios với các config mặc định
export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true // Quan trọng để gửi/nhận cookies
});

// Instance axios thường cũng nên có withCredentials
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export const loginUser = async (data) => {
  const res = await axiosClient.post('/user/sign-in', data)
  return res.data
}

export const signupUser = async (data) => {
  const res = await axiosClient.post('/user/sign-up', data)
  return res.data
}

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(`/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  })
  return res.data
}

export const refreshToken = async () => {
  const res = await axiosClient.post('/user/refresh-token')  // withCredentials đã được set ở instance
  return res.data
}

export const logoutUser = async () => {
  const res = await axiosClient.post('/user/log-out')  // withCredentials đã được set ở instance
  return res.data
}

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(`/user/update-user/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });
  return res.data;
}
  
    