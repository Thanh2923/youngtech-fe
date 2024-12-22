import slugify from "../slugify/Slugify";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import "../HotPromotion.css";
import { IoIosStar } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import { useDispatch,useSelector } from "react-redux";
import { RootState,AppDispatch } from "@/redux/Store";
import MemoryGb from "../memoryGb/MemoryGb";
import { fetchNameParentCategoriesByChildId } from "@/redux/Category/categoryChildThunks";


  export const ItemProduct = ({item}) => {
    
    const image = item && item.images && Array.isArray(item.images) && item.images.length > 0 ? item.images[0].imageUrl : [];
      const router = useRouter();
      const dispatch = useDispatch<AppDispatch>();
      const {parentName,childName} = useSelector((state:RootState) => state.categories_child.nameCategory);
      const handlClickDetailsPro =  async (id:number,name:string,childCategory_id:number)=>{
        await  dispatch(fetchNameParentCategoriesByChildId(childCategory_id))
        if(parentName && childName && name){
          const nameProduct = slugify(name);
          const parentCategoryName = slugify(parentName);
          const childCategoryName = slugify(childName);
          router.push(`/${parentCategoryName}/${childCategoryName}/${nameProduct}/?id=${id}`);
        }
      
      }
      const formattedPrice = new Intl.NumberFormat('de-DE').format(item.productRetailPrice);
      const priceRetailSale = new Intl.NumberFormat('de-DE').format((item.productRetailPrice) - (item.productRetailPrice * (item.productSalePrice /100)))
      return (
    
        <div onClick={()=> handlClickDetailsPro(item.id,item.productName,item.childCategory_id)}  key={item.id} className='flex  group flex-col my-3 hover:shadow-lg border px-3 rounded-lg py-3'>
          <p className='mb-5 overflow-hidden   text-[11px] w-[70px] flex justify-center bg-slate-200'>Trả góp 0%</p>
          <div className="image relative h-[200px]">
            <Image
             src={image}
              alt={item.productName}
              className='transform transition-transform duration-500 ease-in-out group-hover:-translate-y-4'
              width={400}
      height={400}
            />
          </div>
          <h3 className='pt-5 text-[14px] font-semibold transition-colors duration-500 group-hover:text-blue-600 w-full'>
            {item.productName}
          </h3>
          <div className='print-screen pt-1 w-full flex items-center gap-2'>
            <span className='text-[12px] bg-slate-200 px-2 rounded-lg'>6.9</span>
            <span className='text-[12px] bg-slate-200 px-2 rounded-lg'>Super Retina XDR</span>
          </div>
          <MemoryGb />
          <strong className='price w-full text-[16px] text-red-600'>{Number(item.productSalePrice) === 0 ? formattedPrice : priceRetailSale}₫</strong>
           {
              Number(item.productSalePrice) === 0 ? "" :              <div className="flex  space-x-2">
              <span className="line-through text-gray-400 text-sm">{formattedPrice}₫</span>
              <span className="text-red-500 text-sm">-{item.productSalePrice}%</span>
            </div>
           }

<div className='star flex items-center py-1 text-slate-500'>
            <IoIosStar className="text-yellow-400 text-[12px]" />
            <span className=''>{4.5}</span>
          </div>
         
          <LuHeart className="text-[1.6rem] text-gray-500 absolute top-1 hover:text-red-600 cursor-pointer right-1" />
        </div>
      
    )
  }