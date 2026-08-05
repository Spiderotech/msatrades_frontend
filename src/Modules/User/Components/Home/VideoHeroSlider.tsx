import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaShieldAlt, FaTools, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import vid1 from "../../../../assets/herosection.mp4";
import vid2 from "../../../../assets/herosection2.mp4";

const videoList = [vid2, vid1];

const highlights = [
  { icon: <FaTruck />, label: "UK Delivery" },
  { icon: <FaShieldAlt />, label: "Secure Checkout" },
  { icon: <FaTools />, label: "Parts & Support" },
];

export default function VideoHeroSlider() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videoList.length);
  };

  return (
    <section className="relative min-h-[620px] w-full overflow-hidden bg-gray-950 text-white lg:min-h-[760px]">
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideo}
          src={videoList[currentVideo]}
          className="absolute inset-0 h-full w-full object-cover brightness-110"
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={handleVideoEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/45 to-gray-950/5" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/85 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-12 sm:px-6 lg:min-h-[760px] lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-orange-300">
            MSA Trades Ltd Cycle Store
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Modern cycles and essentials for confident everyday riding.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
            Browse locally stored product data for cycles, accessories, and spare
            parts with a simple storefront experience.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-orange-500 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-600"
            >
              Shop Products
              <FaArrowRight />
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-orange-300 hover:text-orange-300"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 p-3 text-xs font-black backdrop-blur-sm"
              >
                <span className="text-orange-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
