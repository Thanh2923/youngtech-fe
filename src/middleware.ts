// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
   
  // // Nếu đã đăng nhập và cố gắng truy cập login/register
  if (token && (pathname === '/login' || pathname === '/register'  )) {
    return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ
  }

  // // Nếu đã đăng nhập và cố gắng truy cập login/register
  const url = req.url;
  if (url.includes('/dashboard/quanly-banhang')) {
    if (token.role !== 'admin' && token.role !== 'storekeeper') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }
  if (url.includes('/dashboard/quanly-nhanvien')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }

  if (url.includes('/dashboard/quanly-danhmuc-sanpham')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }

  
  if (url.includes('/dashboard/quanly-hoadon') || url.includes('/dashboard/quanly-nhanvien')) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }

   
  if (url.includes('/dashboard/quanly-kinhdoanh') ) {
    if ( token.role !== 'admin' || token.role !== 'businessEmployee') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }

  if (url.includes('/dashboard/quanly-nha-cungcap') ) {
    if (token.role !== 'admin' || token.role !== 'businessEmployee') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }

  if (url.includes('/dashboard/quanly-nhap-khohang') ) {
    if (token.role !== 'admin' || token.role !== 'businessEmployee') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Chuyển hướng về trang chủ nếu không phải admin hoặc storekeeper
    }
  }


  

  return NextResponse.next(); // Tiếp tục yêu cầu
}

// Cấu hình middleware chỉ áp dụng cho các đường dẫn cần kiểm tra
export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'], // Đảm bảo matcher chính xác
};

