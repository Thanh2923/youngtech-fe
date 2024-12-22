"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const listImage = [
  { id: 1, imageBanner: "/designImage/imageBanner/Banner/1.png", alt: "banner1" },
  { id: 2, imageBanner: "/designImage/imageBanner/Banner/2.png", alt: "banner2" },
  { id: 3, imageBanner: "/designImage/imageBanner/Banner/3.png", alt: "banner3" },
  { id: 4, imageBanner: "/designImage/imageBanner/Banner/4.png", alt: "banner4" },
];

const Carousels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % listImage.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <section className="category hidden lg:block w-full">
      <div className="w-full">
        <div className="relative h-[500px]" style={{ zIndex: 0 }}>
          {listImage.map((item, index) => (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: 0 }}
            >
              <Image
                src={item.imageBanner}
                alt={item.alt}
                fill
                style={{ zIndex: -1 }}
                className="object-cover z-10 object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousels;
