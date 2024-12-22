import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;


export const getRoles = async () => {

  try {
    const response = await axios.get(`${Api_url}/roles/getAllRole`);
    console.log('Roles retrieved:', response.data); // Log dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error retrieving Roles:', error.response?.data || error.message);
    throw error;
  }
};