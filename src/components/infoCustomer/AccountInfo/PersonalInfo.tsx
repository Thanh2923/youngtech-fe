import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
const PersonalInfo = () => {
  // State để quản lý việc hiển thị form chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // State quản lý dữ liệu thông tin cá nhân
  const [userInfo, setUserInfo] = useState({
    name: 'ThanhNV',
    phone: '0931247957',
    id: '123456',
    email: 'thanhnv2923@gmail.com'
  });

  // State để lưu dữ liệu tạm thời khi chỉnh sửa
  const [tempInfo, setTempInfo] = useState({ ...userInfo });

  // Hàm xử lý khi người dùng nhấn "Sửa"
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Hàm xử lý khi người dùng thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi người dùng nhấn "Lưu"
  const handleSaveClick = () => {
    setUserInfo(tempInfo);
    setIsEditing(false);
  };

  // Hàm xử lý khi người dùng nhấn "Hủy"
  const handleCancelClick = () => {
    setTempInfo({ ...userInfo });
    setIsEditing(false);
  };

  return (
    <div className="w-full  mb-5 bg-white shadow-md  overflow-auto rounded p-4" >
      <h2 className="text-lg font-bold mb-4">THÔNG TIN CÁ NHÂN</h2>

      {!isEditing ? (
        <div>
          <p className='flex gap-3 items-center'>
            {userInfo.name} - {userInfo.phone} - {userInfo.id} - {userInfo.email}
            <button 
              onClick={handleEditClick} 
              className="text-blue-500 flex gap-1 items-center ml-2">
                <FaEdit className='text-blue-500' />
              Sửa
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={tempInfo.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={tempInfo.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Mã số</label>
            <input
              type="text"
              name="id"
              value={tempInfo.id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={tempInfo.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSaveClick}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900"
            >
              Lưu
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
