"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { GoCheckCircleFill } from "react-icons/go";
import { toast } from "react-toastify";

interface UploadImageProps {
  handleGetArrayImage: (urls: { url: string; public_id: string }[]) => void;
  initialImage?: string | null; // Cho phép truyền URL ảnh cũ
}

const UploadImage: React.FC<UploadImageProps> = ({ handleGetArrayImage, initialImage }) => {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null); // Store Cloudinary public_id

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage); // Nếu có ảnh cũ, set giá trị vào state
    }
  }, [initialImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (!validateFiles(filesArray)) return;
      setImages(filesArray);
      await handleUpload(filesArray);
    }
  };

  const validateFiles = (files: File[]) => {
    if (files.length === 0) {
      toast.error("Vui lòng chọn ít nhất một tệp.");
      return false;
    }
    const isValid = files.every((file) => file.type.startsWith("image/"));
    if (!isValid) {
      toast.error("Chỉ được phép tải lên tệp hình ảnh.");
      return false;
    }
    const isSizeValid = files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB
    if (!isSizeValid) {
      toast.error("Tệp phải nhỏ hơn 5MB.");
      return false;
    }
    return true;
  };

  const handleUpload = async (files: File[]) => {
    setLoading(true);

    try {
      const base64Files = await Promise.all(
        files.map(
          (image) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
            })
        )
      );

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: base64Files }),
      });

      const data = await response.json();
      if (response.ok) {
        const imageUrls = data.urls.map(
          (item: { url: string; public_id: string }) => ({
            url: item.url,
            public_id: item.public_id,
          })
        );
        handleGetArrayImage(imageUrls);
        setImageUrl(imageUrls[0]?.url || null);
        setPublicId(imageUrls[0]?.public_id || null);
        toast.success("Tải ảnh lên thành công!");
      } else {
        toast.error("Tải lên thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Đã xảy ra lỗi khi tải lên hình ảnh.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!publicId) {
      toast.error("Không tìm thấy ảnh để xóa.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(null);
        setPublicId(null);
        toast.success("Xóa ảnh thành công!");
      } else {
        toast.error("Xóa ảnh thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Đã xảy ra lỗi khi xóa hình ảnh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative w-32 h-32 rounded-full border-4 flex justify-center items-center cursor-pointer transition-all hover:shadow-xl hover:border-blue-500 ${
          loading ? "border-gray-300" : "border-gray-400"
        } ${imageUrl ? "border-blue-400" : "border-dashed"}`}
      >
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Uploaded Avatar"
              width={128}
              height={128}
              className="object-cover w-32 h-32 rounded-full border-2 border-blue-500"
            />
            <button
              onClick={handleDeleteImage}
              className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-red-500 transition-all"
            >
              <GoCheckCircleFill size={20} color="green" />
            </button>
          </>
        ) : (
          <AiOutlineCamera size={40} color="gray" />
        )}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UploadImage;
