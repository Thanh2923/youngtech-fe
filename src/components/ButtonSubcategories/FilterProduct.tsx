"use client"
import React, { useState } from "react";
import FilterModal from '../FilterProduct/FilterProduct';


const FilterProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    
    <>
      <button  onClick={() => setIsModalOpen(true)} className="border py-2 px-4 shadow-sm gap-2 flex justify-center items-center rounded-md"> Lọc</button>
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default FilterProduct
