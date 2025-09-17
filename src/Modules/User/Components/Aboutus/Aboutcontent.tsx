import React from 'react'
import logo from "../../../../assets/contact.jpg";


const Aboutcontent = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 p-8 max-w-6xl mx-auto">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={logo}
          alt="Cyclist with mountain bike"
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold">Our Story</h2>
        <p className="text-xl font-semibold mt-2">
          Riding Towards a Healthier, Greener Tomorrow 
        </p>
        <p className="mt-4 text-gray-600">
          Our journey began with a simple mission: to make cycling accessible and enjoyable for
          everyone. From passionate riders to casual commuters, we wanted to create a one-stop
          destination for high-quality bicycles and cycling gear.  
        </p>
        <p className="mt-4 text-gray-600">
          Over the years, we have partnered with top brands and trusted manufacturers to bring
          you a wide range of mountain bikes, road bikes, hybrids, and accessories — all carefully
          curated for performance, comfort, and style.  
        </p>
        <p className="mt-4 text-gray-600">
          Today, we proudly serve cycling enthusiasts across India with fast delivery, expert
          assembly support, and unmatched quality. Because for us, cycling isn’t just
          about bikes — it’s about freedom, adventure, and community.  
        </p>
      </div>
    </section>
  )
}

export default Aboutcontent
