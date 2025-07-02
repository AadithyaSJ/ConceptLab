import React from 'react'

const Title2 = ({title}) => {
  return (
    <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 drop-shadow-lg bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700 bg-clip-text text-transparent font-display tracking-wide"
        style={{ fontFamily: "'Audiowide', cursive" }}
    >  
        {title}
    </h2>

  )
}

export default Title2