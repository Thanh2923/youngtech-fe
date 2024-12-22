import Image from 'next/image';

const BannerTwo = () => {
  return (

      <div className=" w-full pb-5 flex justify-between space-x-4">

        <div className="w-1/2 relative">
          <Image 
            src="/designImage/imageBanner/Banner/bannerTwo1.png" 
            alt="Banner 1" 
            width={500}
            height={500}
            className='w-[98%]'
            
          />
        </div>

        <div className="w-1/2 relative">
          <Image 
            src="/designImage/imageBanner/Banner/bannerTwo2.png" 
            alt="Banner 2" 
            className='w-[98%]'
            width={500}
            height={500}
          />
        </div>
      </div>
   
  );
};

export default BannerTwo;
