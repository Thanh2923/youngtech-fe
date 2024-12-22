"use client";
import { ModernSimpleInput } from "./InputType";
import React, { useState } from "react";

const InputPriceSale = () => {
  const [value, setValue] = useState("");
  return (
    <div className="input-sale flex flex-col gap-2 ">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Giá Sale
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập giá Sale..."
        type="text"
        value={value}
      />
    </div>
  );
};

export default InputPriceSale;
