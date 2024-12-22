
  import "./HotPromotion.css";
import { LogoSaleHome } from "./LogoSaleHome/LogoSaleHome";
import { ProductHome } from "./product/ProductHome";
import SeeMore from "./see-more/SeeMore";
import { TitleHome } from "./title-home/TitleHome";



  const HotPromotion = () => {
    return (
      <>
       <TitleHome title=" Khuyến mãi Online"/>
       <section className="w-full bg-white ">
         <LogoSaleHome/> 
          <ProductHome />
          <SeeMore/>
       </section>
       
      </>
    );
  };

  export default HotPromotion;

 
  