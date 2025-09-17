import React from 'react'
import { useNavigate } from 'react-router-dom';

const Banner2 = () => {
   const navigate = useNavigate();

   const services = [
  { 
    id: "01.", 
    title: "Tune-ups & Builds", 
    text: "Expert maintenance and full bike builds to keep your ride performing at its best." 
  },
  { 
    id: "02.", 
    title: "Adjust & Install", 
    text: "Professional installation and fine-tuning of parts and accessories for a smooth ride." 
  },
  { 
    id: "03.", 
    title: "Personal Bike Fit", 
    text: "Customized bike fitting to ensure maximum comfort, safety, and efficiency." 
  },
  { 
    id: "04.", 
    title: "Free Delivery", 
    text: "Fast and reliable delivery of your bike and accessories right to your doorstep." 
  }
];

  return (
    <section className="relative bg-[#171717] text-white py-16 px-10 lg:px-32">
      <h4 className="text-orange-500 text-sm tracking-widest uppercase">Your Ride Starts Here.</h4>
      <h2 className="text-5xl font-bold mt-2">Bike Services & Repair</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
        {services.map((service, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-semibold">
              <span className="text-orange-500">{service.id} </span>
              {service.title}
            </h3>
            <p className="text-gray-400">{service.text}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/shop")} className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
        EXPLORE PRODUCTS
      </button>

      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <img src="https://cycles-cauchois.fr/wp-content/uploads/2023/11/h1-bannernew-jpg.webp" alt="Bike" className="w-full h-full object-contain opacity-90" />
      </div>
    </section>
  )
}

export default Banner2
