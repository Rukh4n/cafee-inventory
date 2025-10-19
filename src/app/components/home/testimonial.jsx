"use client"
import React from "react"
import { User, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dancing_Script, Poppins } from "next/font/google"

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] })

const testimonials = [
  {
    name: "Rina Saputra",
    text: "Suasana kafenya hangat dan kopi-nya luar biasa. Setiap kali datang rasanya selalu ingin kembali!",
    rating: 5,
  },
  {
    name: "Aditya Pratama",
    text: "Tempat yang nyaman untuk nongkrong sambil bekerja. Aromanya bikin betah berlama-lama.",
    rating: 4,
  },
  {
    name: "Lina Mariana",
    text: "Staffnya ramah dan setiap sajian kopi punya cerita tersendiri. Recommended banget!",
    rating: 5,
  },
]

const Testimonial = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  return (
    <section
      ref={ref}
      className={`min-h-screen bg-[#030303] text-[#F1EFEC] flex flex-col items-center justify-center px-6 py-20 border-t-4 border-b-4 border-[#D4C9BE] ${poppins.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <User size={60} className="text-[#F1EFEC] drop-shadow-[2px_2px_6px_#D4C9BE]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`${dancing.className} text-5xl sm:text-6xl mb-6 drop-shadow-[3px_3px_8px_#D4C9BE] text-[#F1EFEC]`}
        >
          Testimonial Pelanggan
        </motion.h2>
        <div className="w-24 h-[2px] bg-[#D4C9BE] mx-auto mt-2 mb-8 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {testimonials.map((testi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            className="bg-[#1a1a1a] rounded-xl p-6 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
          >
            <div className="flex items-center mb-4">
              {[...Array(testi.rating)].map((_, i) => (
                <Star key={i} size={20} className="text-[#D4C9BE] mr-1" />
              ))}
            </div>
            <p className="text-[#F1EFEC]/90 mb-4">{testi.text}</p>
            <p className={`${dancing.className} text-[#F1EFEC] font-bold`}>{testi.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonial
