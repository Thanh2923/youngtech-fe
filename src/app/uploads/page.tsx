import UploadImage from '@/components/UploadImage'
import React from 'react'

const page = () => {
  return (
   <UploadImage handleGetArrayImage={function (urls: { url: string; public_id: string }[]): void {
      throw new Error('Function not implemented.')
    } }/>
  )
}

export default page
