'use client'
import React from 'react'

const ProductSearch = ({ searchQuery, handleChange, productSuggestions, handleSelectProduct }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <label style={{ marginBottom: '4px', color: '#F1EFEC' }}>Search Product</label>
      <input
        type="text"
        name="searchQuery"
        value={searchQuery}
        onChange={handleChange}
        autoComplete="off"
        placeholder="Search for a product"
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #D4C9BE',
          backgroundColor: '#030303',
          color: '#F1EFEC',
          outline: 'none'
        }}
      />
      {productSuggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#030303',
          border: '1px solid #D4C9BE',
          borderRadius: '6px',
          marginTop: '4px',
          maxHeight: '160px',
          overflowY: 'auto',
          zIndex: 10,
          listStyle: 'none',
          padding: 0
        }}>
          {productSuggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                color: '#F1EFEC'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4C9BE';
                e.currentTarget.style.color = '#030303';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F1EFEC';
              }}
            >
              {product.name} - Rp{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductSearch
