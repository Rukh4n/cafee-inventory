import React from "react"

const TotalPriceMobile = ({ totalPrice, selectedItems }) => {
  if (selectedItems.length === 0) return null

  return (
    <div className="mt-6 border-t border-[#D4C9BE] pt-4 text-center lg:hidden">
      <h3 className="text-lg font-bold">
        Total: Rp {totalPrice.toLocaleString()}
      </h3>
    </div>
  )
}

export default TotalPriceMobile
