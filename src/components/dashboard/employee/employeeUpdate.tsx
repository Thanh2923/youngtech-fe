"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadImage from "@/components/UploadImage/UploadImgEmployee";
import {
  getEmployeeById,
  updateEmployee,
} from "@/services/employee/EmployeeService";
import { getRoles } from "@/services/role/RoleService";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const schema = yup.object({
  userName: yup.string().required("Tên tài khoản là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  position: yup.string().required("Chức vụ là bắt buộc"),
  profilePicture: yup.string().required("Ảnh đại diện là bắt buộc"),
});

const UpdateEmployeeForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<{ id: number; roleName: string }[]>([]);
  const [error, setError] = useState("");

  // Formik setup
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      position: "",
      profilePicture: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setError("");
      try {
        await updateEmployee(id, values);
        toast.success("Cập nhật thông tin nhân viên thành công!");
        router.push("/dashboard/quanly-nhanvien");
      } catch (err: any) {
        const errorMsg = err.message || "Có lỗi xảy ra khi cập nhật";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    },
  });

  // Fetch employee data and roles on component mount
  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await getEmployeeById(id);
          const data = response.message;

          formik.setValues({
            userName: data?.userName || "",
            email: data?.email || "",
            fullName: data?.fullName || "",
            phoneNumber: data?.phoneNumber || "",
            position: data?.position || "",
            profilePicture: data?.profilePicture || "",
          });
        } catch (err) {
          toast.error("Không thể tải dữ liệu nhân viên");
          setError("Không thể tải dữ liệu nhân viên");
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    } else {
      toast.error("Không tìm thấy ID nhân viên");
      setError("Không tìm thấy ID nhân viên");
      setLoading(false);
    }

    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        if (rolesData && Array.isArray(rolesData.result)) {
          setRoles(rolesData.result);
        } else {
          throw new Error("Dữ liệu chức vụ không hợp lệ");
        }
      } catch (error) {
        toast.error("Lỗi khi tải danh sách chức vụ!");
      }
    };

    fetchRoles();
  }, [id]);

  // Handle uploaded image
  const handleGetArrayImage = (imageArray: any[]) => {
    if (Array.isArray(imageArray) && imageArray.length > 0) {
      const imageUrl = imageArray[0]?.url || "";
      formik.setFieldValue("profilePicture", imageUrl);
    }
  };

  return (
    <div className="p-4 bg-[#282F36] text-white rounded-md">
      <div className="p-4 relative flex items-center mb-6">
        <Link href="/dashboard/quanly-nhanvien">
          <ShinyRotatingBorderButton className="absolute left-0 text-center text-blue-600 hover:text-blue-800">
            Quay lại
          </ShinyRotatingBorderButton>
        </Link>

        <h2 className="absolute inset-x-0 text-center text-2xl font-semibold">
          Cập nhật nhân viên
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/50">
          {[
            { label: "Tên tài khoản", name: "userName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Tên đầy đủ", name: "fullName", type: "text" },
            { label: "Số điện thoại", name: "phoneNumber", type: "text" },
            { label: "Chức vụ", name: "position", type: "select" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded bg-[#282F36] text-white border border-gray-700"
                >
                  <option value="">Chọn chức vụ</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.roleName}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={label}
                  className="w-full px-3 py-2 rounded bg-[#282F36] text-white border border-gray-700"
                />
              )}
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm text-white/50 font-medium mb-1">
            Ảnh đại diện
          </label>
          <UploadImage
            handleGetArrayImage={handleGetArrayImage}
            initialImage={formik.values.profilePicture}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.profilePicture}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <ShinyRotatingBorderButton
            type="submit"
            className={`${loading && "cursor-wait"}`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Cập nhật nhân viên"}
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
