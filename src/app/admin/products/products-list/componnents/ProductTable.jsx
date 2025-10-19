import React from "react"

const ProductTable = ({ products, onProductClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#3a3a3a] rounded-lg text-sm md:text-base">
        <thead className="bg-[#1A1A1A] text-left">
          <tr>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Code</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Image</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Name</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Category</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Stock</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Price</th>
            <th className="p-2 md:p-3 border-b border-[#3a3a3a]">Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#1f1f1f] transition cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  {product.code}
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  {product.name}
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  {product.category}
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  {product.stock}
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="p-2 md:p-3 border-b border-[#3a3a3a]">
                  {new Date(product.createdAt).toLocaleString("id-ID")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center p-4 md:p-6 text-gray-400 border-b border-[#3a3a3a]"
              >
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
