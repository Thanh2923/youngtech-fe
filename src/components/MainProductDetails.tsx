"use client"
import ImageProductDetails from './image-product-details/ImageProductDetails'
import Breadcrumb from './Breadcrumb/Breadcrumb'
import InfoDetailProduct from './InfoDetailProduct/InfoDetailProduct'
import Review from './review/Review'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '@/redux/Store'
import { fetchProductsId } from '@/redux/Product/productThunks'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react'
import Loadingcss from './loadingcss/Loadingcss'
const MainProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useDispatch<AppDispatch>();
  const {data,loading} = useSelector((state: RootState) => state.products);

  useEffect(()=>{
    if(id){
      dispatch(fetchProductsId(id))
    }
   
  },[dispatch])
  return (
    <>
     {loading && <Loadingcss/>} 
    <div className='w-full flex flex-col  justify-center items-center'>
   
        <main className='w-[90%]' >
          <Breadcrumb name="Chi tiết sản phẩm"/>
     
     <div className=' lg:flex gap-5 w-full'>
        <div className='lg:w-[60%] w-full'>
            <ImageProductDetails  dataProduct={data}  />
            
        </div>
        <div className='lg:w-[40%] mb-5 w-full '>
        <InfoDetailProduct dataProduct={data}/>
         
        </div>
        
     </div>
   
    
        </main>
    </div>
    </>
  )
}

export default MainProductDetails
