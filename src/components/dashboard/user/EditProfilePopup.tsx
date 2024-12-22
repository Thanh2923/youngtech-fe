"use client"
import React, { useState, useEffect } from 'react';

interface EditProfilePopupProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (newImage: string, newName: string, newGender: string, newBirthDate: string, newEmail: string) => void;
    currentImage: string;
    currentName: string;
    currentGender: string;
    currentBirthDate: string;
    currentEmail: string;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ isVisible, onClose, onSave, currentImage, currentName, currentGender, currentBirthDate, currentEmail }) => {
    const [newImage, setNewImage] = useState<string | null>(currentImage);
    const [name, setName] = useState(currentName);
    const [gender, setGender] = useState(currentGender);
    const [birthDate, setBirthDate] = useState(currentBirthDate);
    const [email, setEmail] = useState(currentEmail);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setNewImage(previewUrl);
        }
    };

    const handleSave = () => {
        if (newImage) {
            onSave(newImage, name, gender, birthDate, email);
        }
    };

    useEffect(() => {
        setName(currentName);
        setGender(currentGender);
        setBirthDate(currentBirthDate);
        setEmail(currentEmail);
    }, [currentName, currentGender, currentBirthDate, currentEmail]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-[#1f2937] rounded-lg shadow-lg p-6 w-1/3 text-white">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Chỉnh sửa thông tin cá nhân</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Hình ảnh</label>
                        <div className="flex items-center mt-2">
                            <img 
                                src={newImage || "https://via.placeholder.com/100"} 
                                alt="Avatar Preview" 
                                className="w-20 h-20 rounded-full mr-4 border border-gray-500"
                            />
                            <input 
                                type="file" 
                                className="block text-sm text-gray-400 bg-transparent border border-gray-500 rounded-md p-2 hover:border-gray-300 focus:outline-none focus:border-indigo-500"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Họ và tên</label>
                        <input 
                            type="text" 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Giới tính</label>
                        <select 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Ngày sinh</label>
                        <input 
                            type="date" 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)}
                        />
                    </div>


                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            className="mr-2 px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button 
                            type="button" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            onClick={handleSave}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePopup;
