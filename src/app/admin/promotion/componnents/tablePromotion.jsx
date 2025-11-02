"use client"
import React, { useState } from "react"
import { ImageOff, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Detail from "./detail"

const TablePromotion = ({ promotions = [] }) => {
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendPromotion = (promo) => {
    setConfirmModal(promo)
  }

  const handleConfirmSend = async () => {
    setSending(true)
    setMessage("")

    try {
      const response = await fetch(`/api/promotion/send/${confirmModal.id}`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to send promotion")

      const result = await response.json()
      setMessage(`✅ ${result.message || "Promotion sent successfully!"}`)

      setTimeout(() => {
        setConfirmModal(null)
        setMessage("")
      }, 2000)
    } catch (error) {
      console.error(error)
      setMessage("❌ Failed to send promotion.")
    } finally {
      setSending(false)
    }
  }

  const handleOpenDetail = (promo) => setSelectedPromo(promo)
  const handleCloseDetail = () => setSelectedPromo(null)
  const handleCloseConfirm = () => setConfirmModal(null)

  return (
    <div className="relative bg-[#030303] text-[#F1EFEC] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.length > 0 ? (
        promotions.map((promo, index) => (
          <div
            key={promo.id || index}
            className="border border-[#D4C9BE] rounded-xl bg-[#1a1a1a] shadow-md overflow-hidden flex flex-col"
          >
            <div
              className="relative w-full h-40 bg-[#030303] flex items-center justify-center cursor-pointer"
              onClick={() => handleOpenDetail(promo)}
            >
              {promo.image ? (
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#D4C9BE]">
                  <ImageOff className="w-10 h-10 mb-1" />
                  <p className="text-xs">No Image</p>
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div
                className="cursor-pointer"
                onClick={() => handleOpenDetail(promo)}
              >
                <h3 className="text-base font-semibold mb-2 text-[#F1EFEC]">
                  {promo.title}
                </h3>
                <div className="text-xs space-y-1 text-[#D4C9BE]">
                  <p>
                    <span className="font-semibold">Discount:</span>{" "}
                    {promo.percentage || "-"}%
                  </p>
                  <p>
                    <span className="font-semibold">Quota:</span>{" "}
                    {promo.limitQuota || "-"}
                  </p>
                  <div className="flex justify-between text-xs">
                    <p>
                      <span className="font-semibold">Start:</span>{" "}
                      {promo.startDate}
                    </p>
                    <p>
                      <span className="font-semibold">End:</span>{" "}
                      {promo.endDate}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSendPromotion(promo)}
                className="mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-md font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Promotion
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-[#D4C9BE] text-sm">
          No promotions found
        </div>
      )}

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedPromo && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#030303] border border-[#D4C9BE] rounded-2xl shadow-xl w-full max-w-2xl my-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <div className="sticky top-0 bg-[#030303] z-10 flex justify-end p-4 border-b border-[#D4C9BE]">
                <button
                  onClick={handleCloseDetail}
                  className="text-[#D4C9BE] hover:text-[#F1EFEC] transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto p-4">
                <Detail promo={selectedPromo} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Kirim */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#030303] border border-[#D4C9BE] rounded-2xl shadow-xl p-6 max-w-md w-full text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#F1EFEC]">
                Confirm Send Promotion
              </h2>
              <p className="text-sm text-[#D4C9BE] mb-6">
                Are you sure you want to send the promotion{" "}
                <span className="font-semibold text-[#F1EFEC]">
                  "{confirmModal.title}"
                </span>{" "}
                to all guest email accounts?
              </p>

              {message && (
                <p className="text-sm text-[#D4C9BE] mb-3">{message}</p>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleConfirmSend}
                  disabled={sending}
                  className="bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Yes, Send"}
                </button>
                <button
                  onClick={handleCloseConfirm}
                  className="border border-[#D4C9BE] text-[#D4C9BE] px-4 py-2 rounded-lg font-semibold hover:bg-[#1a1a1a] transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TablePromotion
