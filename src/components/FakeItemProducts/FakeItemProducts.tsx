import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FakeItemProducts = () => {
  return (
    <div className="product-list w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex flex-col">
          {/* Skeleton cho hình ảnh sản phẩm */}
          <Skeleton className="w-full  gradient-bg h-[200px]" />

          {/* Container cho tên sản phẩm và thông tin khác */}
          <div className="w-full mt-2">
            {/* Skeleton cho tên sản phẩm */}
            <Skeleton className="h-5  gradient-bg mb-1" />
            {/* Skeleton cho giá sản phẩm */}
            <Skeleton className="h-5  gradient-bg mb-1" />
            {/* Skeleton cho mô tả sản phẩm */}
            <Skeleton count={2} className="h-4  gradient-bg mb-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FakeItemProducts;
