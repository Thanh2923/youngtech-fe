import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const files = body.files; // Nhận danh sách ảnh (dạng base64)

console.log('v', files)

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ message: 'No files provided' }, { status: 400 });
    }

    // Tải lên nhiều ảnh đồng thời
    const uploadPromises = files.map((file: string) =>
      cloudinary.uploader.upload(file, {
        folder: 'uploads',
      })
    );

    // Chờ tất cả ảnh tải lên hoàn tất
    const uploadResults = await Promise.all(uploadPromises);

    // Lấy danh sách URL từ kết quả tải lên
    const urls = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    return NextResponse.json({ urls }); // Trả về danh sách URL
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Upload failed', error: error.message },
      { status: 500 }
    );
  }
}


 
 