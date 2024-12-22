import Image from "next/image";

const DestionscriptProduct = ({ dataProduct }) => {
    if (!dataProduct || !dataProduct.description) {
      return <div className="w-full text-center text-gray-600">Mô tả không có sẵn</div>;
    }
  
    return (
      <div className="w-full  p-6  bg-white shadow-lg rounded-lg">
      <div className="w-full flex py-5 justify-center items-center">
      <div className="bg-blue-50 py-2 px-10 w-[35%] rounded-md "> 
            <h3 className="font-semibold text-blue-500">Thông số kỹ thuật</h3>
        </div>
      </div>
           <div className="relative w-full h-[500px]">
      <Image
        src="/designImage/imageProducts/ts-oppo.jpg"
        alt="oppo-reno-f12-f"
        fill
        className="object-cover"
      />
    </div>
    
    <div className="w-full" dangerouslySetInnerHTML={{ __html: dataProduct.description }} />
  

      </div>
    );
  };
  
  export default DestionscriptProduct;
  