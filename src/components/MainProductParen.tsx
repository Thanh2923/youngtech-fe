
import BannerTwo from './banner-two/BannerTwo';
import ButtonSubcategories from './ButtonSubcategories/ButtonSubcategories';
import ProductParen from './product/ProductParen';
import SeeMore from './see-more/SeeMore';

const MainProductParen: React.FC = () => {


  return (
    <>
  <div className='w-full flex flex-col justify-center items-center'>
   
    <main className='w-[95%] mt-5'>
    <BannerTwo />
       <div className='w-full rounded-xl mb-5 bg-white'>

      
          <ButtonSubcategories />
        
        <ProductParen/>
       
       
        </div>
    </main>
  </div>
      
    </>
  );
};

export default MainProductParen;
