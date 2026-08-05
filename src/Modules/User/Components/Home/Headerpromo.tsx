import { motion } from "framer-motion";

const messages = [
  "UK cycle products and support",
  "Cycles, accessories, and spare parts",
  "Contact: contact@msatrades.com",
];

const Headerpromo = () => {
  return (
    <div className="w-full overflow-hidden border-b border-orange-400/30 bg-gray-950 py-2">
      <motion.div
        className="flex whitespace-nowrap text-xs font-black uppercase tracking-[0.22em] text-white sm:text-sm"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {[...messages, ...messages].map((message, index) => (
          <span key={`${message}-${index}`} className="mr-10 inline-flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {message}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Headerpromo;
