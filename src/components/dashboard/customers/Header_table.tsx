
import React from 'react';
import { SearchBar } from '../SearchBar';
import { ShinyRotatingBorderButton } from '../ButtonSave/BtnSave';
import Link from 'next/link';
const HeaderTable = () => {
    return (
      <div className="header-table flex justify-end items-center my-4 gap-4 p-4">

       
        <div className="Add ">
            <Link href='/dashboard/quanly-kinhdoanh/thongtin-khachhang/them-khachhang'>
              <ShinyRotatingBorderButton>Thêm</ShinyRotatingBorderButton>
            </Link>
        </div>
      </div>
    );
}

export default HeaderTable;
