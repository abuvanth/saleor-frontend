'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: {
    id: string
    name: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const existingItem = get().items.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          set({
            items: get().items.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
