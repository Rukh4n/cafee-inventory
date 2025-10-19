// TransactionSummary.jsx
'use client'
import React from 'react'

const TransactionSummary = ({ cashGiven, totalPrice, change, handleChange }) => {
  const inputStyle = {
    backgroundColor: '#030303',
    color: '#F1EFEC',
    border: '1px solid #D4C9BE',
    padding: '8px',
    borderRadius: '6px',
    width: '100%',
    marginTop: '4px',
    marginBottom: '8px',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label>
        Cash Given
        <input
          type="number"
          name="cashGiven"
          value={cashGiven}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
      <label>
        Total Price
        <input
          type="number"
          value={totalPrice}
          readOnly
          style={inputStyle}
        />
      </label>
      <label>
        Change
        <input
          type="number"
          value={change}
          readOnly
          style={inputStyle}
        />
      </label>
    </div>
  )
}

export default TransactionSummary
