'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

export interface CartItem {
  id: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (itemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'upskiill_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Guards the save effect against overwriting a stored cart with the empty
  // initial state. The load below defers setItems by a microtask (to keep the
  // first client render identical to the server's), which means the save effect
  // fires first with `items` still []. Without this flag it wrote "[]" over the
  // user's saved cart on every mount, and a tab closed in that window lost it.
  const hasHydrated = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      try {
        const data = JSON.parse(savedCart);
        Promise.resolve().then(() => {
          setItems(data);
          hasHydrated.current = true;
        });
        return;
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    hasHydrated.current = true;
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!hasHydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Functional updates throughout, so every handler is stable for the life of
  // the provider. addItem previously closed over `items` via isInCart, which
  // both rebuilt the context value on every cart change and risked acting on a
  // stale snapshot inside async callers.
  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Genuinely derived from items, so it changes with them — that is correct,
  // and it is the only handler that does.
  const isInCart = useCallback((itemId: string) => items.some((item) => item.id === itemId), [items]);

  // PERF: memoized. CartProvider is mounted in the root layout, so it wraps
  // every route in the app including the marketing pages. The inline object
  // literal it used to pass meant any ancestor render produced a new context
  // value and re-rendered every consumer beneath it.
  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      totalItems: items.length,
      totalPrice: items.reduce((sum, item) => sum + item.price, 0),
      isInCart,
    }),
    [items, addItem, removeItem, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
