import React from 'react';
import FileDropzone from '../../editProduct/DropFile/DropFile';
const ImageCustomer = () => {
    return (
        <>
            <div className="bg-[#282F36]  rounded-xl">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thêm hình ảnh sản phẩm
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4">
                  <FileDropzone />
                </div>
              </div>
            </div> 
        </>
    );
}

export default ImageCustomer;
