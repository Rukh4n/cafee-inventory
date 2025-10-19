"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const menus = [
  {
    id: 1,
    name: "Croissant",
    image: "/menu/croissant.jpg",
  },
  {
    id: 2,
    name: "Espresso",
    image: "/menu/menu-espresso.jpg",
  },
  {
    id: 3,
    name: "Brownie",
    image: "/menu/menu-brownie.jpg",
  },
  {
    id: 4,
    name: "Cappuccino",
    image: "/menu/menu-cappuccino.jpg",
  },
]

const BasetMenu = () => {
  const [currentMenu, setCurrentMenu] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMenu((prev) => (prev + 1) % menus.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex items-center justify-center h-[80vh] bg-[#D4C9BE] overflow-hidden px-4 sm:px-6 md:px-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={menus[currentMenu].id}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-6"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#030303] tracking-wider leading-tight drop-shadow-[4px_4px_6px_rgba(0,0,0,0.3)]">
              {menus[currentMenu].name}
            </h2>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
              <Image
                src={menus[currentMenu].image}
                alt={menus[currentMenu].name}
                fill
                className="object-cover rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-4 border-[#030303]"
                priority
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 flex gap-3">
        {menus.map((menu, index) => (
          <button
            key={menu.id}
            onClick={() => setCurrentMenu(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentMenu
                ? "bg-[#030303] scale-125"
                : "bg-[#030303]/40 hover:bg-[#030303]/60"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default BasetMenu
