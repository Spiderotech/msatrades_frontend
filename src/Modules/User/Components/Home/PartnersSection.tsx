import React from 'react'

const PartnersSection = () => {
  return (
    <section className="py-12 text-center">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900">
        Providing a quality service is at the heart of our <span className="text-black">concerns:</span>
      </h2>
      <p className="text-xl text-gray-500 mt-2">
        This is why our team strives to respond to you with our best partner
      </p>

      {/* Partner Logos */}
      <div className="flex justify-center items-center flex-wrap gap-8 mt-8">
        <img src="/assets/rider.png" alt="Rider" className="h-10 object-contain" />
        <img src="/assets/motosport.png" alt="Moto Sport" className="h-10 object-contain" />
        <img src="/assets/motorsports.png" alt="Motorsports" className="h-10 object-contain" />
        <img src="/assets/rider2.png" alt="Rider" className="h-10 object-contain" />
        <img src="/assets/numerama.png" alt="Numerama" className="h-10 object-contain" />
        <img src="/assets/lesechos.png" alt="Les Echos" className="h-10 object-contain" />
      </div>
    </section>
  )
}

export default PartnersSection
