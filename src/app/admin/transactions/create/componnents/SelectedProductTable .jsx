// SelectedProductTable.jsx
'use client'
import React from 'react'
import { DollarSign } from 'lucide-react'

const SelectedProductTable = ({ products = [], handleQuantityChange }) => {
  const safeProducts = Array.isArray(products) ? products : []

  if (safeProducts.length === 0) return null

  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%', backgroundColor: '#030303', padding: '10px', borderRadius: '8px' }}>
      <table
        style={{
          width: 'auto',
          borderCollapse: 'collapse',
          margin: '0 auto',
          color: '#F1EFEC',
          border: '1px solid #D4C9BE',
          fontSize: '14px'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1a1a1a' }}>
            <th style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>Product</th>
            <th style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>Price</th>
            <th style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>Quantity</th>
            <th style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {safeProducts.map((product) => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>{product.name}</td>
              <td style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>
                <DollarSign style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                Rp{product.price}
              </td>
              <td style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>
                <input
                  type="number"
                  value={product.quantity || 1}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  style={{
                    width: '50px',
                    padding: '3px',
                    borderRadius: '4px',
                    border: '1px solid #D4C9BE',
                    backgroundColor: '#030303',
                    color: '#F1EFEC',
                    textAlign: 'center'
                  }}
                />
              </td>
              <td style={{ border: '1px solid #D4C9BE', padding: '6px 10px' }}>
                <DollarSign style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                Rp{(product.price || 0) * (product.quantity || 1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SelectedProductTable
