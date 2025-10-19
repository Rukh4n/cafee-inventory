import React from 'react'
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer
      style={{
        height: '100vh',
        backgroundColor: '#030303',
        color: '#F1EFEC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Connect with Us</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook size={32} color="#F1EFEC" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter size={32} color="#F1EFEC" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram size={32} color="#F1EFEC" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github size={32} color="#F1EFEC" />
        </a>
        <a href="mailto:contact@example.com">
          <Mail size={32} color="#F1EFEC" />
        </a>
      </div>
      <p style={{ fontSize: '16px' }}>© 2025 Your Company. All rights reserved.</p>
    </footer>
  )
}

export default Footer
