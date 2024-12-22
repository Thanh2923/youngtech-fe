

const NameProduct = ({data,fontsize}) => {
  return (
    <>
    <div className="w-full items-center flex pb-5 justify-between">
       <h1 style={fontsize} className="font-semibold ">{data.productName}</h1>
    
       </div>
       

    </>
  )
}

export default NameProduct
