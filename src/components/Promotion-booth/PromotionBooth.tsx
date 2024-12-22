
import Image from "next/image"
import { TitleHome } from "../title-home/TitleHome"

const PromotionBooth = () => {
  return (
    <div className="w-full mb-10">
       <TitleHome title={"Gian hàng ưu đãi"}/>
       <div className="w-full sm:flex-wrap  grid grid-cols-4 gap-5  justify-between items-center">
          <Image 
            src="/designImage/imageBanner/Banner/bn1.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image
           
            src="/designImage/imageBanner/Banner/bn2.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image 
            
            src="/designImage/imageBanner/Banner/bn3.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image 
            
            src="/designImage/imageBanner/Banner/bn4.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
       </div>
    </div>
  )
}

export default PromotionBooth
