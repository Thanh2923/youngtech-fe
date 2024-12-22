import React from 'react'

const MemoryGb = () => {
  return (
    <>
             <div className='gb w-full py-3'>
            <ul className='flex flex-wrap text-[12px] items-center gap-2'>
              <li className='border px-2 py-1 rounded-lg'>256Gb</li>
              <li className='border px-2 py-1 rounded-lg'>512Gb</li>
              <li className='border px-2 py-1 rounded-lg' >1Tb</li>
            </ul>
         </div>
    </>
  )
}

export default MemoryGb
