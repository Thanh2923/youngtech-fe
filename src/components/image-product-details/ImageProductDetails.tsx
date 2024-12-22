"use client";

import { useState } from "react";
import Image from "next/image";
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import DestionscriptProduct from "../destionscript-product/DestionscriptProduct";
const ImageProductDetails: React.FC = ({dataProduct}) => {
    const image = dataProduct?.images?.map(item => item.imageUrl);
    const images: string[] = [
    `${ image ?  image[0] : ""}`,
    `${image ? image[1] : ""}`,
    `${image ? image[2] : ""}`,
    `${image ? image[2] : ""}`,
    `${image ? image[4] : ""}`,

    ];

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const nextImage = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
       <>
        <div className="w-full bg-white p-5 mb-5 rounded-lg">
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-[90%]  h-[400px] mb-4 overflow-hidden"> 
                   <div className="w-[80%] h-full flex flex-col justify-center items-center py-5 relative m-auto">
                   <Image
                    
                    src={`${images ? images[0] : ""}`}
                    alt="Product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg "
                />
                   </div>
                    <div className=" bg-slate-200 px-2 rounded-lg absolute bottom-1 right-1 text-center mb-2">
                    <span className="font-semibold">
                        {activeIndex + 1} / {images.length}
                    </span>
                </div>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                    >
                       <FaAngleLeft />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                    >
                       <FaAngleRight />
                    </button>
                </div>
                
                
                <div className="flex h-[40px] space-x-2   mb-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-14 h-14 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                                activeIndex === index ? "border-2 border-blue-500" : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image
                                src={image}
                                alt={`Thumbnail ${index}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="w-full">
<DestionscriptProduct dataProduct={dataProduct}/>
        </div>
       </>
    );
};

export default ImageProductDetails;
