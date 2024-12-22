import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
// add employees
export const createEmployee = async (employeeData: any) => {
  const response = await fetch(`${Api_url}/employees/createEmployee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi thêm nhân viên.");
  }
};
// fetch all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${Api_url}/employees/viewingListEmployee`);
    console.log('Employees retrieved:', response.data); // Log dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error retrieving employees:', error.response?.data || error.message);
    throw error;
  }
};

export const getEmployeeById = async (accountID: string) => {
  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/employees/viewOnlyEmployee/${accountID}`);
      return response.data;
  } catch (error: any) {
      console.error('Error fetching employee by ID:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin nhân viên.');
  }
};


export const updateEmployee = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${Api_url}/employees/updateInformationEmployee/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin nhân viên.');
  }
};


// delete employee
export const deleteEmployee = async (accountId: any) => {
  try {
    const response = await axios.delete(`${Api_url}/employees/deleteEmployeeById/${accountId}`);
    console.log('Employee deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error.response?.data || error.message);
    throw error;
  }
};