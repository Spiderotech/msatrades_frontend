import React from 'react'

const Whishlisthero = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center text-white">
    {/* Background Image */}
    <div className="absolute inset-0 bg-[url('https://cycles-cauchois.fr/wp-content/uploads/2023/11/h1-bannernew-jpg.webp')] bg-cover bg-center">
      <div className="absolute inset-0  bg-opacity-50"></div>
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center">
      <h1 className="text-3xl md:text-5xl font-bold">WISHLIST</h1>
      <p className="text-lg mt-2">
         <span className="text-white">Home</span> 
        <span className="mx-2">›</span> 
        <span className="text-white">Wishlist</span>
      </p>
    </div>
  </section>
  )
}

export default Whishlisthero
