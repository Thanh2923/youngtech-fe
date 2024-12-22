"use client"
import React, { useState,useEffect } from "react";

const FilterModal = ({ isOpen, onClose }) => {
  
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedBrandOne, setSelectedBrandOne] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedFeature, setSelectedFeature] = useState([]);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup khi component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const brands = [
    "SAMSUNG",
    "iPhone",
    "oppo",
    "xiaomi",
    "vivo",
    "realme",
    "HONOR",
    "TCL",
    "TECNO",
    "NOKIA",
    "Masstel",
    "mobell",
    "itel",
    "viettel",
    "benco",
  ];

  const prices = [
    "Dưới 2 triệu",
    "Từ 2 - 4 triệu",
    "Từ 4 - 7 triệu",
    "Từ 7 - 13 triệu",
    "Từ 13 - 20 triệu",
    "Trên 20 triệu",
  ];

  const phoneTypes = ["Android", "iPhone (iOS)"];
  const features = [
    "Chơi game / Cấu hình cao",
    "Pin khủng trên 5000 mAh",
    "Chụp ảnh, quay phim",
  ];

  const toggleSelection = (name) => {
    setSelectedBrandOne([...selectedBrandOne,name])
  }

  const handleReset = () => {
    setSelectedBrand([]);
    setSelectedPrice("");
    setSelectedType("");
    setSelectedFeature([]);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white rounded-lg w-[600px] p-6 shadow-lg scrollbar-thumb-gray-500 scrollbar-track-gray-100  scrollbar-thin overflow-auto max-h-[90vh]">
         <div className="flex items-center">
         <div className=" w-[80%]">
          {selectedBrandOne.length > 0 && 
          selectedBrandOne.map(item=>(
            <button 
            className="px-4 py-1 border rounded-full border-gray-300"
          >
        {item}
          </button>
          ))
          }
       
        
          </div>
          <div className=" w-[20%]  mb-4">
            <button onClick={onClose} className="text-gray-500">
              &times; Đóng
            </button>
          </div>
         </div>
          <div className="space-y-4">
            {/* Hãng */}
            <div>
              <h3 className="font-semibold">Hãng</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {brands.map((brand, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleSelection(brand) }
                    className={`px-4 py-1 border rounded-full ${
                      selectedBrand.includes(brand)
                        ? "bg-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Giá */}
            <div>
              <h3 className="font-semibold">Giá</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {prices.map((price, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPrice(price)}
                    className={`px-4 py-1 border rounded-full ${
                      selectedPrice === price
                        ? "bg-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Loại điện thoại */}
            <div>
              <h3 className="font-semibold">Loại điện thoại</h3>
              <div className="flex gap-4 mt-2">
                {phoneTypes.map((type, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-1 border rounded-full ${
                      selectedType === type
                        ? "bg-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Nhu cầu */}
            <div>
              <h3 className="font-semibold">Nhu cầu</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((feature, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      toggleSelection(feature, selectedFeature, setSelectedFeature)
                    }
                    className={`px-4 py-1 border rounded-full ${
                      selectedFeature.includes(feature)
                        ? "bg-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Bỏ chọn
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Xem 120 kết quả
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FilterModal;
