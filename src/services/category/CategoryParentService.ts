import axios from 'axios';
// import { getAuthHeaders } from '@/utils/session';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

// Hàm thêm dữ liệu category
export const addCategory = async (name) => {
    // const headers = await getAuthHeaders();

    try {
        const response = await axios.post(`${Api_url}/parencategories`, name);
        console.log('Data added:', response.data);
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
    }
}

export const getAllCategory = async () => {
    // const headers = await getAuthHeaders();

    try {
      const response = await axios.get(`${Api_url}/parencategories`);
      return response.data; // Trả về dữ liệu danh mục từ API
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      throw error;
    }
}
// Hàm lấy danh mục theo ID
export const getCategoryById = async (id) => {
    // const headers = await getAuthHeaders();

    try {
        const response = await axios.get(`${Api_url}/parencategories/${id}`);
        return response.data; // Trả về danh mục cụ thể
    } catch (error) {
        console.error('Error fetching data by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
}
// Hàm cập nhật dữ liệu category
export const updateCategory = async (id, updatedCategory) => {
    // const headers = await getAuthHeaders();

    try {
        const response = await axios.put(`${Api_url}/parencategories/${id}`, updatedCategory);
        console.log('Data updated:', response.data);
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
    }
}

// Hàm xóa dữ liệu
export const deleteCategory = async (id) => {

    try {
        const response = await axios.delete(`${Api_url}/parencategories/${id}`);
        console.log('Data deleted:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
    }
}
