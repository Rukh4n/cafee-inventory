"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dancing_Script, Poppins } from "next/font/google"

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] })

const images = [
  { src: "/menu/hero-coffee.jpg", alt: "Hero Coffee" },
  { src: "/menu/interior-coffee-bar.jpg", alt: "Interior Coffee Bar" },
  { src: "/menu/interior-dining.jpg", alt: "Interior Dining" },
  { src: "/menu/location-day.jpg", alt: "Location Day" },
  { src: "/menu/location-night.jpg", alt: "Location Night" },
]

const animations = [
  { opacity: [0, 1], y: [50, 0], rotate: [0, 2] },
  { opacity: [0, 1], x: [-30, 0], y: [30, 0] },
  { opacity: [0, 1], x: [30, 0], y: [50, 0] },
  { opacity: [0, 1], y: [60, 0], scale: [0.8, 1] },
  { opacity: [0, 1], x: [-20, 0], y: [40, 0], scale: [0.9, 1] },
]

const Galery = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  return (
    <section
      ref={ref}
      className={`min-h-screen bg-[#030303] text-[#F1EFEC] flex flex-col items-center justify-center px-6 py-20 ${poppins.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-center mb-12"
      >
        <h2
          className={`${dancing.className} text-5xl sm:text-6xl mb-4 text-[#F1EFEC] drop-shadow-[3px_3px_8px_#D4C9BE]`}
        >
          Galeri Kami
        </h2>
        <p className="text-[#F1EFEC]/90 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg drop-shadow-[2px_2px_6px_#D4C9BE]">
          Setiap sudut memiliki kisahnya sendiri. Dari aroma kopi yang membangunkan pagi,
          hingga cahaya hangat yang menenangkan malam. Inilah ruang kami — tempat rasa dan
          suasana berpadu menjadi kenangan manis.
        </p>
        <div className="w-24 h-[2px] bg-[#D4C9BE] mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl justify-items-center">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={animations[index]}
            animate={inView ? animations[index] : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.8,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-xl border border-[#D4C9BE]/40 shadow-[0_8px_20px_rgba(0,0,0,0.5)] w-64 sm:w-72 md:w-80"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={280}
              className="object-cover w-full h-48 sm:h-56 md:h-64 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
              <p
                className={`${dancing.className} text-xl sm:text-2xl text-[#F1EFEC] mb-3 drop-shadow-[2px_2px_6px_#D4C9BE]`}
              >
                {img.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Galery
