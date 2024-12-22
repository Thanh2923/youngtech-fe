import React from 'react'

import Link from "next/link";
  import Image from "next/image";
const listSale = [
    { id: 1, image: "/designImage/imageCategories/sale.png", alt: "sale" },
    { id: 2, image: "/designImage/imageCategories/giadungsale.png", alt: "sale" },
    { id: 3, image: "/designImage/imageCategories/nuocnongsale.png", alt: "sale" },
    { id: 4, image: "/designImage/imageCategories/hangcaocap.png", alt: "sale" },
  ];
export const LogoSaleHome = () => {
  return (
    <>
     <div className="w-full ">
            <ul className="flex items-center">
              {listSale.map((item,index) => {
                return (
                  <>
                    <li key={index} className="pr-8">
                      <Link href="/" className="">
                        <Image
                        width={200} height={200}
                          className=" py-6 border-b-2 duration-500 transition-all hover:border-b-red-600 w-[130px]"
                          src={item.image}
                          alt={item.alt}
                        />
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
    </>
  )
}
