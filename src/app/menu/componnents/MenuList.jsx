import React from 'react'

const MenuList = ({ menu }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {menu.map((item) => (
        <div
          key={item.id}
          className="border border-[#D4C9BE] rounded-lg p-4 bg-[#030303] text-[#F1EFEC] flex flex-col items-start"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
          <p className="mb-1">Kategori: {item.category}</p>
          <p className="mb-1">Stok: {item.stock}</p>
          <p className="font-bold mb-4">Rp {item.price.toLocaleString()}</p>
          <button className="bg-[#D4C9BE] text-[#030303] px-4 py-2 rounded-lg hover:opacity-90 transition w-full text-left">
            Pesan
          </button>
        </div>
      ))}
    </div>
  )
}

export default MenuList
