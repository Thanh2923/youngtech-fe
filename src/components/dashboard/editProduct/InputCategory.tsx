"use client"; 
 
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function InputCategory() {
  return (
    <div className="input-sale flex flex-col gap-2 ">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Loại sản phẩm
      </label>
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ti vi</SelectLabel>
          <SelectItem value="Tủ lạnh">Tủ lạnh</SelectItem>
          <SelectItem value="Máy tính">Máy tính</SelectItem>
          <SelectItem value="Điện thoại">Điện thoại</SelectItem>
          <SelectItem value="Máy điều hòa">Máy điều hòa</SelectItem>
          <SelectItem value="Bàn là">Bàn là</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}
