"use client"
import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';

const data = {
  hanoi: {
    name: "Hà Nội",
    districts: {
      district1: {
        name: "Quận 1",
        wards: ["Phường 1", "Phường 2", "Phường 3"],
      },
      district2: {
        name: "Quận 2",
        wards: ["Phường 1", "Phường 2", "Phường 4"],
      },
    },
  },
  hcm: {
    name: "TP. Hồ Chí Minh",
    districts: {
      district1: {
        name: "Quận 1",
        wards: ["Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho"],
      },
      district2: {
        name: "Quận 2",
        wards: ["Phường Thảo Điền", "Phường An Phú", "Phường Bình An"],
      },
    },
  },
};

const AccountInfo = () => {

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistrict(''); // Reset district when city changes
    setWard(''); // Reset ward when city changes
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setWard(''); // Reset ward when district changes
  };

  const handleUpdate = () => {
    console.log({
      city,
      district,
      ward,
      street,
      isDefaultAddress,
    });
  };

  return (
    <div className="bg-gray-100 p-6 w-full h-screen rounded-md">
      <PersonalInfo/>
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-4">ĐỊA CHỈ NHẬN HÀNG</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Select Thành phố */}
          <select
            className="border p-2 rounded-md"
            value={city}
            onChange={handleCityChange}
          >
            <option value="">Tỉnh/ Thành phố</option>
            {Object.keys(data).map((cityKey) => (
              <option key={cityKey} value={cityKey}>
                {data[cityKey].name}
              </option>
            ))}
          </select>

          {/* Select Quận/Huyện */}
          <select
            className="border p-2 rounded-md"
            value={district}
            onChange={handleDistrictChange}
            disabled={!city}
          >
            <option value="">Quận/ Huyện</option>
            {city &&
              Object.keys(data[city].districts).map((districtKey) => (
                <option key={districtKey} value={districtKey}>
                  {data[city].districts[districtKey].name}
                </option>
              ))}
          </select>

          {/* Select Phường/Xã */}
          <select
            className="border p-2 rounded-md"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            disabled={!district}
          >
            <option value="">Phường/ Xã</option>
            {district &&
              data[city].districts[district].wards.map((ward, index) => (
                <option key={index} value={ward}>
                  {ward}
                </option>
              ))}
          </select>

          {/* Nhập địa chỉ */}
          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Số Nhà, Tên Đường*"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="defaultAddress"
            checked={isDefaultAddress}
            onChange={(e) => setIsDefaultAddress(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="defaultAddress">Đặt làm địa chỉ mặc định</label>
        </div>

        <div className='w-full flex justify-center items-center'>
          <button
            onClick={handleUpdate}
            className="w-[30%] flex justify-center bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-md"
          >
            CẬP NHẬT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
