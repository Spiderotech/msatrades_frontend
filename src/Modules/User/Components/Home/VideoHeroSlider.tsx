import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vid1 from "../../../../assets/herosection.mp4";
import vid2 from "../../../../assets/herosection2.mp4";

const videoList = [vid1, vid2, vid1];

export default function VideoHeroSlider() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videoList.length);
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideo}
          src={videoList[currentVideo]}
          className="absolute inset-0 w-full h-full object-cover"
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
    </div>
  );
}
