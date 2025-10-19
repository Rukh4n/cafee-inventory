// components/Headline.jsx
"use client"
import React, { useState, useEffect } from "react"
import { Coffee, CupSoda, Utensils } from "lucide-react"
import { Dancing_Script } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

const slides = [
  {
    id: 1,
    icon: <Coffee className="w-10 h-10 text-[#d4c9be]" />,
    title: "Welcome to Cozy Café",
    text: "Nikmati secangkir kopi terbaik dan suasana hangat di tempat kami ☕",
    bg: "from-[#2c1810] via-[#4a3e36] to-[#d4c9be]",
  },
  {
    id: 2,
    icon: <CupSoda className="w-10 h-10 text-[#d4c9be]" />,
    title: "Freshly Brewed Every Day",
    text: "Kami menyajikan minuman segar yang dibuat dari bahan pilihan 🍹",
    bg: "from-[#4a3e36] via-[#2c1810] to-[#d4c9be]",
  },
  {
    id: 3,
    icon: <Utensils className="w-10 h-10 text-[#d4c9be]" />,
    title: "Delicious Food Awaits",
    text: "Lengkapi harimu dengan hidangan lezat dan suasana nyaman 🍰",
    bg: "from-[#d4c9be] via-[#4a3e36] to-[#2c1810]",
  },
]

const Headline = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg} transition-all duration-1000`}
        />
      </AnimatePresence>

      <header
        className={`${dancing.className} relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center p-6`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              {slides[currentSlide].icon}
              <h1 className="text-5xl font-bold tracking-wide">
                {slides[currentSlide].title}
              </h1>
            </div>
            <p className="text-2xl max-w-md text-[#f1efec]">
              {slides[currentSlide].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#d4c9be] scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </header>
    </div>
  )
}

export default Headline
