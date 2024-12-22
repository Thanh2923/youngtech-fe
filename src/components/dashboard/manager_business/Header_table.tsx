
import React from 'react';
import { SearchBar } from '../SearchBar';
import { ShinyRotatingBorderButton } from '../ButtonSave/BtnSave';
import Link from 'next/link';
const HeaderTable = () => {
    return (
        <div className="header-table flex items-center my-4 gap-4 p-4">
        <div className="all-product">
          <p className="text-white/60 font-semibold">Tìm kiếm</p>
        </div>
        <div className="div">
          <SearchBar />
        </div>
        <div className="find">
          <ShinyRotatingBorderButton>Tìm Kiếm</ShinyRotatingBorderButton>
        </div>
        {/* <div className="Add">
            <Link href='/dashboard/quanly-nha-cungcap/them-cungcap'>
              <ShinyRotatingBorderButton>Thêm</ShinyRotatingBorderButton>
            </Link>
        </div> */}
      </div>
    );
}

export default HeaderTable;
