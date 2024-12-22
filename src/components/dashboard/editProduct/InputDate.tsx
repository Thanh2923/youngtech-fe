"use client";
import { ModernSimpleInput } from "./InputType";
import React, { useState } from "react";

const InputDate = () => {
  const [value, setValue] = useState("");
  return (
    <div className="input-sale flex flex-col gap-2 ">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Ngày sửa
      </label>
      <ModernSimpleInput
        className="w-72 cursor-pointer"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập ngày..."
        type="date"
        value={value}
      />
    </div>
  );
};

export default InputDate;
