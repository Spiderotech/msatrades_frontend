import { useNavigate } from 'react-router-dom';
import homeImage from "../../../../assets/home.png";

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
    <section className="relative min-h-[560px] overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0">
        <img
          src={homeImage}
          alt="Modern cycle workshop"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/15" />
      </div>

      <div className="relative z-10 px-6 py-16 lg:px-32">
        <div className="max-w-2xl">
          <h4 className="text-sm font-black uppercase tracking-[0.24em] text-orange-400">Your Ride Starts Here.</h4>
          <h2 className="mt-2 text-3xl font-black md:text-5xl">Bike Services & Repair</h2>
          <p className="mt-4 leading-7 text-gray-300">
            Support for cycles, accessories, and spare parts with a simple local shopping flow.
          </p>
      
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <h3 className="text-xl font-bold">
                  <span className="text-orange-500">{service.id} </span>
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.text}</p>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/shop")} className="mt-8 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600">
            EXPLORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  )
}

export default Banner2
