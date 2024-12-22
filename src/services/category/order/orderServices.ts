import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
// add employees

// fetch all employees
export const getOrderByIdCustomer = async (id) => {
  try {
    const response = await axios.get(`${Api_url}/order/getOrderByIdMe/${id}`,);
    console.log('Employees retrieved:', response.data); // Log dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error retrieving employees:', error.response?.data || error.message);
    throw error;
  }
};






