"use client";

// src/components/Avatar.tsx

import React, { useState } from 'react';
import EditProfilePopup from './EditProfilePopup';

const Avatar: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // State lưu thông tin cá nhân
    const [profileData, setProfileData] = useState({
        image: "http://2.bp.blogspot.com/-g1udFSmrxfQ/VXGmJByTSqI/AAAAAAAAGtQ/o8EiCBKcyfA/s1600/hinh-anh-nen-hd-sieu-ro-net-cuc-dep-cho-may-tinh-img025.jpg",
        name: "Nguyễn Văn A",
        gender: "male",
        birthDate: "2000-01-01",
        email: "nguyenvana@example.com",
    });

    const handleEditProfile = () => {
        setIsPopupVisible(true); // Hiển thị popup
    };

    const closePopup = () => {
        setIsPopupVisible(false); // Đóng popup
    };

    const handleSaveProfile = (
        newImage: string,
        newName: string,
        newGender: string,
        newBirthDate: string,
        newEmail: string
    ) => {
        setProfileData({
            image: newImage,
            name: newName,
            gender: newGender,
            birthDate: newBirthDate,
            email: newEmail,
        });
        setIsPopupVisible(false); // Đóng popup sau khi lưu
    };

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsMenuVisible(true)}
            onMouseLeave={() => setIsMenuVisible(false)}
        >
            <img
                src={profileData.image}
                className="w-10 h-10 rounded-full"
                alt="Avatar"
            />
            {isMenuVisible && (
                <div className="absolute right-0 mt-0.5 w-50 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    <ul className="py-2 text-sm text-gray-200">
                        <li
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                            onClick={handleEditProfile}
                        >
                            Chỉnh sửa thông tin cá nhân
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => alert('Đăng xuất')}
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            )}

            {/* Truyền dữ liệu vào EditProfilePopup */}
            <EditProfilePopup
                isVisible={isPopupVisible}
                onClose={closePopup}
                onSave={handleSaveProfile}
                currentImage={profileData.image}
                currentName={profileData.name}
                currentGender={profileData.gender}
                currentBirthDate={profileData.birthDate}
                currentEmail={profileData.email}
            />
        </div>
    );
};

export default Avatar;
