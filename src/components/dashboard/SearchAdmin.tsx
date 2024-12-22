import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input"
const SearchAdmin = () => {
  return (
  
       <div className="flex w-[30%] py-5 gap-2 justify-between ">
    <div className="relative w-full max-w-xs">
<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
  <FaSearch />
</span>
<Input
  type="text"
  placeholder="Tìm kiếm..."
  className="pl-10" 
/>
</div>

</div>
    
  )
}

export default SearchAdmin
