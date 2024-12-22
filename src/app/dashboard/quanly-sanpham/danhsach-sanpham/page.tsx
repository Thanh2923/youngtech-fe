import React from "react";
const Page = () => {
  return (
    <div>
      <header>
        <h2 className="text-white/90 font-bold  text-[1.2rem]">
          DANH SÁCH SẢN PHẨM
        </h2>
      </header>
      <main>
        <div className="table-products">
            <div className="header-table">
                <div className="all-product">
                    <p>Tất cả sản phẩm</p>
                </div>
                <div className="div">
                    <div className="add-product">
                        <button>Thêm sản phẩm</button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
