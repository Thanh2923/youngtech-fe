import axios from 'axios';
// import { getAuthHeaders } from '@/utils/session';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

// Hàm thêm dữ liệu childcategory
export const addChildCategory = async (data) => {
    // const headers = await getAuthHeaders();
    try {
        const response = await axios.post(`${Api_url}/childcategories`, dat);
        console.log('Data added:', response.data);
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
    }
}

// Hàm lấy tất cả dữ liệu childcategory
export const getAllChildCategories = async () => {
    // const headers = await getAuthHeaders();
    try {
        const response = await axios.get(`${Api_url}/childcategories`
        );
        return response.data; // Trả về dữ liệu danh mục từ API
    } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm lấy danh mục childcategory theo ID
export const getChildCategoryById = async (id) => {
    // const headers = await getAuthHeaders();
    try {
        const response = await axios.get(`${Api_url}/childcategories/${id}`);
        return response.data; // Trả về danh mục cụ thể
    } catch (error) {
        console.error('Error fetching data by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm cập nhật dữ liệu childcategory
export const updateChildCategory = async (id, updatedCategoryChild) => {
    // const headers = await getAuthHeaders();
    try {
        const response = await axios.put(`${Api_url}/childcategories/${id}`, updatedCategoryChild);
        console.log('Data updated:', response.data);
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
    }
}

// Hàm xóa dữ liệu childcategory
export const deleteChildCategory = async (id) => {
    // const headers = await getAuthHeaders();
    try {
        const response = await axios.delete(`${Api_url}/childcategories/${id}`);
        console.log('Data deleted:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
    }
}
