"use client"
import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Users, Folder, LogOut, Box, List, Package } from "lucide-react"

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showInventoryMenu, setShowInventoryMenu] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: <Folder className="w-5 h-5" />, path: "/admin/dashboard" },
    { name: "Accounts", icon: <Users className="w-5 h-5" />, path: "/admin/accounts" },
    {
      name: "Products",
      icon: <Box className="w-5 h-5" />,
      submenu: [
        { name: "Product Category", path: "/admin/products/categories", icon: <List className="w-4 h-4" /> },
        { name: "Product List", path: "/admin/products/", icon: <List className="w-4 h-4" /> },
      ],
    },
    {
      name: "Inventory",
      icon: <Package className="w-5 h-5" />,
      submenu: [
        { name: "Inventory Category", path: "/admin/inventories/categories", icon: <List className="w-4 h-4" /> },
        { name: "Inventory Items", path: "/admin/inventories/items", icon: <List className="w-4 h-4" /> },
      ],
    },
    { name: "Transactions", icon: <List className="w-5 h-5" />, path: "/admin/transactions" },
  ]

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" })
  }

  const isRouteActive = (path) => pathname.startsWith(path)

  return (
    <aside className="w-64 h-screen bg-[#123458] text-[#F1EFEC] flex flex-col p-4 justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const isActive = isRouteActive(item.path || "")

            if (item.submenu) {
              const isProducts = item.name === "Products"
              const isInventory = item.name === "Inventory"
              const isOpen = isProducts ? showProductsMenu : showInventoryMenu
              const isAnySubActive = item.submenu.some((sub) => isRouteActive(sub.path))

              return (
                <div key={index}>
                  <button
                    onClick={() =>
                      isProducts
                        ? setShowProductsMenu(!showProductsMenu)
                        : setShowInventoryMenu(!showInventoryMenu)
                    }
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition w-full ${
                      isAnySubActive
                        ? "bg-[#D4C9BE] text-[#030303]"
                        : "hover:bg-[#D4C9BE] hover:text-[#030303]"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>

                  {isOpen && (
                    <div className="flex flex-col ml-6 mt-1 gap-1">
                      {item.submenu.map((sub, subIndex) => {
                        const isSubActive = isRouteActive(sub.path)
                        return (
                          <button
                            key={subIndex}
                            onClick={() => router.push(sub.path)}
                            className={`flex items-center gap-2 px-4 py-1 rounded-lg transition text-sm ${
                              isSubActive
                                ? "bg-[#D4C9BE] text-[#030303]"
                                : "hover:bg-[#D4C9BE] hover:text-[#030303]"
                            }`}
                          >
                            {sub.icon}
                            <span>{sub.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={index}
                onClick={() => item.path && router.push(item.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#D4C9BE] text-[#030303]"
                    : "hover:bg-[#D4C9BE] hover:text-[#030303]"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#D4C9BE] text-[#030303] hover:opacity-90 transition"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}

export default Sidebar
