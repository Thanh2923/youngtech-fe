import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

export const getAllSupplier = async () => {
    try {
      const response = await axios.get(`${Api_url}/suppliers`);
      return response.data; // Trả về dữ liệu nhà cungcap từ API
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      throw error;
    }
}

// Hàm lấy nhà cung cấp theo ID
export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${Api_url}/suppliers/${id}`);
        return response.data; // Trả về thông tin nhà cung cấp cụ thể
    } catch (error) {
        console.error('Error fetching supplier by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
}


// Hàm thêm dữ liệu supplier
export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${Api_url}/suppliers`, supplierData);
        console.log('Data added:', response.data);
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
    }
}

// Hàm cập nhật dữ liệu supplier
export const updateSupplier = async (id, updatedSupplier) => {
    try {
        const response = await axios.put(`${Api_url}/suppliers/${id}`, updatedSupplier);
        console.log('Supplier updated:', response.data);
    } catch (error) {
        console.error('Error updating supplier data:', error.response ? error.response.data : error.message);
    }
}

// Hàm xóa dữ liệu supplier
export const deleteSupplier = async (id) => {
    try {
        const response = await axios.delete(`${Api_url}/suppliers/${id}`);
        console.log('Data deleted:', response.data);
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
    }
}
