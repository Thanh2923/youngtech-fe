"use client";
import { ModernSimpleInput } from "./InputType";
import React, { useState } from "react";

const InputPriceOrigin = () => {
  const [value, setValue] = useState("");
  return (
    <div className="input-price flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Giá gốc sản phẩm
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập giá gốc..."
        type="text"
        value={value}
      />
    </div>
  );
};

export default InputPriceOrigin;
