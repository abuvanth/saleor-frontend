'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../store/cart'
import Image from 'next/image'

export function Cart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCartStore()

  const totalPrice = getTotalPrice()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col glass-dark backdrop-blur-2xl bg-gradient-to-b from-black/30 to-black/50 shadow-2xl border-l border-white/20">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="glass-dark p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                            onClick={closeCart}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <div className="glass rounded-2xl p-8">
                                <div className="text-6xl mb-4">🛒</div>
                                <p className="text-white/70 text-lg">Your cart is empty</p>
                              </div>
                            </div>
                          ) : (
                            <ul role="list" className="space-y-4">
                              {items.map((item) => (
                                <li key={item.id} className="glass rounded-2xl p-4 border border-white/20">
                                  <div className="flex items-center space-x-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/20">
                                      {item.image ? (
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={80}
                                          height={80}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                                          <span className="text-white/60 text-xs">No image</span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div>
                                        <div className="flex justify-between text-base font-semibold text-white">
                                          <h3 className="truncate">{item.name}</h3>
                                          <p className="ml-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                          </p>
                                        </div>
                                        {item.variant && (
                                          <p className="mt-1 text-sm text-white/60">{item.variant.name}</p>
                                        )}
                                      </div>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center space-x-2 glass-dark rounded-xl p-1">
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                                          >
                                            <MinusIcon className="h-4 w-4" />
                                          </button>
                                          <span className="text-white font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                                          >
                                            <PlusIcon className="h-4 w-4" />
                                          </button>
                                        </div>

                                        <button
                                          type="button"
                                          className="text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all duration-200"
                                          onClick={() => removeItem(item.id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="glass-dark border-t border-white/20 px-4 py-6 sm:px-6 backdrop-blur-2xl">
                        <div className="flex justify-between text-xl font-bold text-white mb-2">
                          <p>Subtotal</p>
                          <p className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                            ${totalPrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-white/60">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6 space-y-3">
                          <button
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-400 hover:to-pink-400 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                            onClick={closeCart}
                          >
                            Checkout
                          </button>
                          <button
                            className="w-full glass text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/30 transition-all duration-200 border border-white/20"
                            onClick={() => {
                              closeCart()
                              // Navigate to cart page
                            }}
                          >
                            View full cart
                          </button>
                          <button
                            className="w-full text-sm text-white/60 hover:text-white/80 py-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                            onClick={clearCart}
                          >
                            Clear cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
