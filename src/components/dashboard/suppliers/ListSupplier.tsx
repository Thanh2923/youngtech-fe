"use client";
import { getAllSupplier, deleteSupplier, updateSupplier } from "@/services/supplier/SupplierService";
import React, { useEffect, useState } from "react";
import { Supplier } from "@/types/SupplierTypes";
import SupplierTable from "./TableSupplier";
import UpdateSupplier from "./UpdateSupplier";  // Import your new component
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const ListSuppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const router = useRouter();

  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSupplier();
        if (response && response.data) {
          setSuppliers(response.data);
          console.log("Fetched suppliers successfully");
        } else {
          console.log("No data from API");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error.message);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier: Supplier) => {
    console.log("Editing supplier:", supplier);
    setEditingSupplier(supplier);
  };

  const handleEditSubmit = async (updatedSupplier: Supplier) => {
    try {
      await updateSupplier(updatedSupplier.id, { 
        name: updatedSupplier.supplierName, 
        contactName: updatedSupplier.contactName, 
        phoneNumber: updatedSupplier.phoneNumber, 
        email: updatedSupplier.email, 
        address: updatedSupplier.address 
      });
      console.log("Updated supplier successfully");
      // Update the supplier list with the new information
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === updatedSupplier.id ? updatedSupplier : supplier
        )
      );
      setEditingSupplier(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating supplier:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    setSelectedSupplierId(id);
    setIsModalOpen(true); // Show confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await deleteSupplier(selectedSupplierId!); // Perform delete
      setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== selectedSupplierId));
      console.log("Deleted supplier successfully");
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
    }
    setIsModalOpen(false);
    setSelectedSupplierId(null);
  };

  const handleAddClick = () => {
    if (router) {
      router.push("/dashboard/quanly-nha-cungcap/them-cungcap");
    }
  };

  const handleCancelEdit = () => {
    setEditingSupplier(null);
  };

  return (
    <div className="w-full p-4 mx-auto bg-[#282F36] rounded-lg p-6">
      {editingSupplier ? (
        <UpdateSupplier
          supplier={editingSupplier}
          onCancel={handleCancelEdit}
          onUpdateSuccess={handleEditSubmit}
        />
      ) : (
        <>
          <h2 className="text-2xl text-white text-center font-bold mb-4">Danh sách nhà cung cấp</h2>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm nhà cung cấp..."
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ShinyRotatingBorderButton onClick={handleAddClick}>Thêm nhà cung cấp</ShinyRotatingBorderButton>
          </div>
          {filteredSuppliers.length > 0 ? (
            <SupplierTable
              suppliers={filteredSuppliers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">Xác nhận xóa</h2>
            <p className="mb-6 text-white">Bạn có chắc chắn muốn xóa nhà cung cấp này?</p>
            <div className="flex justify-end gap-4">
              <ShinyRotatingBorderButton onClick={() => setIsModalOpen(false)}>Hủy</ShinyRotatingBorderButton>
              <ShinyRotatingBorderButton onClick={confirmDelete}>Xóa</ShinyRotatingBorderButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSuppliers;
