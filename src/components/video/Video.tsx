import React from 'react'

export const Video = ({className}) => {
  return (
    <div className={`${className}`}>
          <div className="h-[600px]">
            <video className="w-full h-full" autoPlay loop muted>
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
  )
}
