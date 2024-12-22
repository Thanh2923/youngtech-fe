import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/Store";
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
} from "@/redux/Address/addressThunks";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const AddressSelector = ({ onAddressChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { provinces, districts, wards } = useSelector(
    (state: RootState) => state.address
  );
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProvince) {
      dispatch(fetchDistricts(selectedProvince));
    }
  }, [selectedProvince, dispatch]);

  useEffect(() => {
    if (selectedDistrict) {
      dispatch(fetchWards(selectedDistrict));
    }
  }, [selectedDistrict, dispatch]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    const selectedProv = provinces.find((prov) => prov.code === value);
    setProvinceName(selectedProv ? selectedProv.name : "");
    setSelectedDistrict(""); // Reset district when province changes
    setDistrictName(""); // Reset district name when province changes
    setSelectedWard(""); // Reset ward when district is reset
    setWardName(""); // Reset ward name when district is reset
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    const selectedDist = districts.find((dist) => dist.code === value);
    setDistrictName(selectedDist ? selectedDist.name : "");
    setSelectedWard(""); // Reset ward when district changes
    setWardName(""); // Reset ward name when district changes
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    const selectedWrd = wards.find((wr) => wr.code === value);
    setWardName(selectedWrd ? selectedWrd.name : "");
  };

  // Send selected address data to parent component
  useEffect(() => {
    if (onAddressChange) {
      onAddressChange({
        province: provinceName,
        district: districtName,
        ward: wardName,
      });
    }
  }, [provinceName, districtName, wardName, onAddressChange]);

  return (
    <div className="info-name-phone z-[300] text-gray-500 flex items-center mt-[20px] justify-between">
      {/* Select Province */}
      <Select onValueChange={handleProvinceChange}>
        <SelectTrigger className="w-[33%] text-black bg-white border border-gray-300 rounded-md">
          <SelectValue placeholder="Chọn Tỉnh/Thành phố" className="text-black" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[300]">
          {provinces?.length > 0 ? (
            provinces.map((province) => (
              <SelectItem
              required
                key={province.code}
                value={province.code}
                className="text-black hover:bg-gray-200"
              >
                {province.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled className="text-gray-400">
              Đang tải...
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Select District */}
      <Select
        onValueChange={handleDistrictChange}
        disabled={!selectedProvince}
      >
        <SelectTrigger className="w-[33%] text-black bg-white border border-gray-300 rounded-md">
          <SelectValue placeholder="Chọn Quận/Huyện" className="text-black" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[300]">
          {districts?.length > 0 ? (
            districts.map((district) => (
              <SelectItem
              required
                key={district.code}
                value={district.code}
                className="text-black hover:bg-gray-200"
              >
                {district.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled className="text-gray-400">
              {selectedProvince
                ? "Đang tải..."
                : "Chọn Tỉnh/Thành phố trước"}
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Select Ward */}
      <Select
        onValueChange={handleWardChange}
        disabled={!selectedDistrict}
      >
        <SelectTrigger className="w-[33%] text-black bg-white border border-gray-300 rounded-md">
          <SelectValue placeholder="Chọn Xã/Phường" className="text-black" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[300]">
          {wards?.length > 0 ? (
            wards.map((ward) => (
              <SelectItem
              required
                key={ward.code}
                value={ward.code}
                className="text-black hover:bg-gray-200"
              >
                {ward.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled className="text-gray-400">
              {selectedDistrict
                ? "Đang tải..."
                : "Chọn Quận/Huyện trước"}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddressSelector;
