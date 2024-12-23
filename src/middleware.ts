// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
   
  // // Nếu đã đăng nhập và cố gắng truy cập login/register
  if (token && (pathname === '/login' || pathname === '/register'  )) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang chủ
  }

  // // Nếu đã đăng nhập và cố gắng truy cập login/register
 


  

  return NextResponse.next(); // Tiếp tục yêu cầu
}

// Cấu hình middleware chỉ áp dụng cho các đường dẫn cần kiểm tra
export const config = {
  matcher: ['/login', '/register'], // Đảm bảo matcher chính xác
};

