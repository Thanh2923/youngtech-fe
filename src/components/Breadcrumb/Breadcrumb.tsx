
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({name}) => {
  return (
    <div className='flex gap-3 px-10 py-5 w-full items-center ' >
    <a href="/" className='text-blue-700'>Trang Chủ</a>
    <IoIosArrowForward />
    <h3 >{name}</h3>
</div>
  )
}

export default Breadcrumb
