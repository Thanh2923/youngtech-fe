import React from 'react'

export const TitleHome = ({title}) => {
  return (
    <h3 style={titles} className="w-full py-5 ">
            {title}
          </h3>
  )
}

const titles = {
    fontWeight: " 700",
    fontSize: " 24px",
    color: "#1d2939",
    marginBottom: "20px",
    lineHeight: " 32px",
  };

