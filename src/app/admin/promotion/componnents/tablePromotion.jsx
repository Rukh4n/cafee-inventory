"use client"
import React from "react"
import { ImageOff } from "lucide-react"

const TablePromotion = ({ promotions = [] }) => {
  const handleSendPromotion = (title) => {
    alert(`Promotion "${title}" has been sent successfully!`)
  }

  return (
    <div className="bg-[#030303] text-[#F1EFEC] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.length > 0 ? (
        promotions.map((promo, index) => (
          <div
            key={promo.id || index}
            className="border border-[#D4C9BE] rounded-xl bg-[#1a1a1a] shadow-md overflow-hidden flex flex-col"
          >
            <div className="w-full h-40 bg-[#030303] flex items-center justify-center">
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
              <div>
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
                onClick={() => handleSendPromotion(promo.title)}
                className="mt-4 bg-[#D4C9BE] text-[#030303] py-2 rounded-md font-semibold text-sm hover:opacity-90 transition"
              >
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
    </div>
  )
}

export default TablePromotion
