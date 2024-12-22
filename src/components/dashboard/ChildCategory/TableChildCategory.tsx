"use client";
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Category_Child } from '@/types/CategoryTypes';
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react"
const Api_url = process.env.NEXT_PUBLIC_API_URL;

const ITEMS_PER_PAGE = 5; // Số lượng mục hiển thị mỗi trang

interface ChildCategoriesTableProps {
  categorieschild: Category_Child[];
  onEdit: (category: Category_Child) => void;
  onDelete: (id: number) => void;
}

const ChildCategoriesTable: React.FC<ChildCategoriesTableProps> = ({
  categorieschild = [],
  onEdit,
  onDelete,
}) => {
  const [parentCategories, setParentCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession()
  console.log(session);
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${Api_url}/parencategories`);
        setParentCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
      }
    };

    fetchParentCategories();
  }, []);

  const totalPages = Math.ceil(categorieschild.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = categorieschild.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Table className="min-w-full divide-y">
        <thead className="text-left bg-[#282F36] text-white/80">
          <tr>
            <th className="py-3 px-4 text-center">STT</th>
            <th className="py-3 px-4 text-center">Tên Danh Mục Cha</th>
            <th className="py-3 px-4 text-center">Tên Danh Mục</th>
            <th className="py-3 px-4 text-center">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {currentItems.length > 0 ? (
            currentItems.map((category, index) => {
              const parentCategory = parentCategories.find(
                (parent) => parent.id === category.parentCategory_id
              );

              return (
                <tr
                  key={category.id}
                  className="product-item text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
                >
                  <td className="py-3 px-4 text-sm text-gray-400 text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-200">
                    {parentCategory ? parentCategory.name : 'Không có danh mục'}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-200">
                    {category.childCateName}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-4">
                    <Button
                      className="hover:bg-blue-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                      onClick={() => onEdit(category)}
                    >
                      <FaEdit className="text-[1.1rem] text-blue-400" />
                    </Button>
                    <Button
                      className="hover:bg-red-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                      onClick={() => onDelete(category.id)}
                    >
                      <MdDeleteOutline className="text-[1.1rem] text-red-400" />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-4 text-center text-gray-400 text-sm"
              >
                Không có danh mục nào để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2">
        <Button
          className={`px-3 py-2 text-sm rounded ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-[#1E293B] hover:bg-gray-700 text-white"}`}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <HiChevronLeft className="text-xl" />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            className={`px-3 py-2 text-sm rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-[#1E293B] hover:bg-gray-700 text-gray-300"}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className={`px-3 py-2 text-sm rounded ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-[#1E293B] hover:bg-gray-700 text-white"}`}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <HiChevronRight className="text-xl" />
        </Button>
      </div>
    </>
  );
};

export default ChildCategoriesTable;
