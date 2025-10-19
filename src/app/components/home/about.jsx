"use client"
import React from "react"
import { Coffee } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dancing_Script, Poppins } from "next/font/google"

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] })

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  return (
    <section
      ref={ref}
      className={`min-h-screen bg-[#030303] text-[#F1EFEC] flex items-center justify-center px-6 py-20 border-b-4 border-[#D4C9BE] ${poppins.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="max-w-4xl text-center"
      >
        <motion.div
          initial={{ rotate: -15, scale: 0.8 }}
          animate={inView ? { rotate: 0, scale: 1 } : { rotate: -15, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <Coffee size={60} className="text-[#F1EFEC] drop-shadow-[2px_2px_6px_#D4C9BE]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`${dancing.className} text-6xl mb-6 drop-shadow-[3px_3px_8px_#D4C9BE] tracking-wide text-[#F1EFEC]`}
        >
          Tentang Kafe Kami
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg leading-relaxed text-[#F1EFEC]/90 drop-shadow-[2px_2px_6px_#D4C9BE]"
        >
          Selamat datang di ruang hangat kami — tempat di mana aroma kopi segar bertemu
          dengan obrolan santai dan tawa ringan. Di sini, setiap cangkir bukan sekadar minuman,
          tapi cerita yang diseduh dengan penuh cinta. Duduklah, nikmati suasana, dan
          biarkan waktu berjalan pelan sambil menyeruput kopi favoritmu. ☕
        </motion.p>
      </motion.div>
    </section>
  )
}

export default About
