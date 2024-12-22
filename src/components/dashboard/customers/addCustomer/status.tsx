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

export function InputStatus() {
  return (
    <div className="input-sale flex flex-col gap-2 ">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Trạng thái
      </label>
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pending ( đang đợi sử lý)</SelectLabel>
          <SelectItem value="Pending">Pending ( đang đợi sử lý)</SelectItem>
          <SelectItem value="Completed">Completed (đã được sử lý)</SelectItem>
          <SelectItem value="Cancel">Cancel (đã hủy)</SelectItem> 
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}
