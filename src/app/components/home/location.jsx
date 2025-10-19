"use client"
import React from "react"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dancing_Script, Poppins } from "next/font/google"

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] })

const locations = [
  {
    name: "Kafe Pusat Kota",
    address: "Jl. Merdeka No. 12, Jakarta",
    icon: <MapPin size={50} className="text-[#F1EFEC]" />,
  },
  {
    name: "Kafe Tepi Pantai",
    address: "Jl. Pantai Indah No. 45, Bali",
    icon: <MapPin size={50} className="text-[#F1EFEC]" />,
  },
  {
    name: "Kafe Pegunungan",
    address: "Jl. Gunung Merapi No. 8, Yogyakarta",
    icon: <MapPin size={50} className="text-[#F1EFEC]" />,
  },
]

const Location = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  return (
    <section
      ref={ref}
      className={`min-h-[80vh] bg-[#030303] text-[#F1EFEC] flex flex-col items-center justify-center px-6 py-10 border-b-4 border-[#D4C9BE] ${poppins.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center mb-12"
      >
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${dancing.className} text-5xl sm:text-6xl mb-4 drop-shadow-[3px_3px_8px_#D4C9BE]`}
        >
          Lokasi Kami
        </motion.h2>
        <div className="w-24 h-[2px] bg-[#D4C9BE] mx-auto mt-2 mb-8 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
            className="bg-[#1a1a1a] rounded-xl p-6 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
          >
            <div className="mb-4">{loc.icon}</div>
            <p className={`${dancing.className} text-xl mb-2`}>{loc.name}</p>
            <p className="text-[#F1EFEC]/90">{loc.address}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Location
