import "./globals.css"

export const metadata = {
  title: "Admin Panel",
  description: "Admin management system",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F1EFEC] text-[#030303]">
        {children}
      </body>
    </html>
  )
}
