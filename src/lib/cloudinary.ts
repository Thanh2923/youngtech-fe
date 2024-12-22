import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary với thông tin từ biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true, // Bắt buộc sử dụng HTTPS
});

export default cloudinary;
