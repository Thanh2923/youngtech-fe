"use client";
import { ModernSimpleInput } from "../../editProduct/InputType";
import React, { useState } from "react";

const NameCustomer = () => {
  const [value, setValue] = useState("");
  return (
    <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Tên khách hàng
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập tên khách hàng..."
        type="text"
        value={value}
      />
    </div>
  );
};

export default NameCustomer;
