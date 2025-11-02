"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Search } from "lucide-react"
import CreatePromotion from "./componnents/createPromotion"
import TablePromotion from "./componnents/tablePromotion"

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [promotions, setPromotions] = useState([])
  const [allPromotions, setAllPromotions] = useState([])

  // Fetch all promotions initially
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch("/api/promotion/promotionList")
        if (!res.ok) throw new Error("Failed to fetch promotions")
        const data = await res.json()
        setPromotions(data)
        setAllPromotions(data)
      } catch (error) {
        console.error("Error fetching promotions:", error)
      }
    }
    fetchPromotions()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) {
      setPromotions(allPromotions)
      return
    }

    try {
      const res = await fetch(`/api/promotion/promotionList?search=${encodeURIComponent(search)}`)
      if (!res.ok) throw new Error("Failed to fetch promotions")
      const data = await res.json()
      setPromotions(data)
    } catch (error) {
      console.error("Error fetching promotions:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-[#F1EFEC] relative p-6">
      {/* Header dengan tombol Create dan Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Kolom Pencarian */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-[#1A1A1A] border border-[#D4C9BE] rounded-lg px-4 py-2 w-full sm:w-1/2"
        >
          <Search className="w-5 h-5 text-[#D4C9BE]" />
          <input
            type="text"
            placeholder="Search promotion title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[#F1EFEC] focus:outline-none ml-2 w-full"
          />
        </form>

        {/* Tombol Create Promotion */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#D4C9BE] text-[#030303] px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Promotion
        </button>
      </div>

      {/* Tabel Promosi */}
      <div className="mt-8">
        <TablePromotion promotions={promotions} />
      </div>

      {/* Modal Create Promotion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#030303] border border-[#D4C9BE] rounded-2xl shadow-xl w-full max-w-3xl my-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              {/* Tombol close */}
              <div className="sticky top-0 bg-[#030303] z-10 flex justify-end p-4 border-b border-[#D4C9BE]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#D4C9BE] hover:text-[#F1EFEC] transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Isi Modal */}
              <div className="max-h-[80vh] overflow-y-auto">
                <CreatePromotion />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page
