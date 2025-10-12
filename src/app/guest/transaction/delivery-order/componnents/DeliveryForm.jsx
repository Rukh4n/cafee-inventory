import React from "react"

const DeliveryForm = ({ formData, handleChange, handlePayment, loading }) => {
  return (
    <div className="p-4 lg:p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Informasi Pengiriman</h2>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handlePayment() }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama"
          className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]"
        />
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="No. Telepon"
          className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Alamat"
          rows={5}
          className="w-full p-3 rounded bg-[#030303] border border-[#D4C9BE]"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-[#D4C9BE] text-[#030303] py-3 rounded"
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </form>
    </div>
  )
}

export default DeliveryForm
