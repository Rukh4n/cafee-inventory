import React from 'react'

const Detail = ({ transaction }) => {
  if (!transaction) return null

  return (
    <div
      style={{
        backgroundColor: '#030303',
        color: '#F1EFEC',
        border: '1px solid #D4C9BE',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h2 style={{ marginBottom: '16px', borderBottom: '1px solid #D4C9BE', paddingBottom: '8px' }}>
        Transaction Detail
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>ID:</strong>
          <span>{transaction.transactionId}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Customer Name:</strong>
          <span>{transaction.name}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Transaction Type:</strong>
          <span>{transaction.transactionType}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Status:</strong>
          <span>{transaction.status}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Payment Method:</strong>
          <span>{transaction.paymentMethod}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Total Price:</strong>
          <span>Rp{transaction.totalPrice}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Created At:</strong>
          <span>{new Date(transaction.createdAt).toLocaleString()}</span>
        </div>

        <div>
          <strong>Items:</strong>
          <div
            style={{
              border: '1px solid #D4C9BE',
              borderRadius: '6px',
              marginTop: '6px',
              padding: '8px',
              backgroundColor: '#1E1E1E',
            }}
          >
            {transaction.items && transaction.items.length > 0 ? (
              transaction.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #D4C9BE',
                    padding: '6px 0',
                  }}
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rp{item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <div>Tidak ada item.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
