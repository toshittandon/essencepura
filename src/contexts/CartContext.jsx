import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [customPackagingName, setCustomPackagingName] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("terra-botanica-cart");
    const savedCustomName = localStorage.getItem("terra-botanica-custom-name");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedCustomName) {
      setCustomPackagingName(savedCustomName);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("terra-botanica-cart", JSON.stringify(items));
  }, [items]);

  // Save custom name to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("terra-botanica-custom-name", customPackagingName);
  }, [customPackagingName]);

  const addToCart = (product, isBundle = false) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, isBundle: isBundle || item.isBundle }
            : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1, isBundle }];
      }
    });
  };

  const addBundleToCart = (products) => {
    products.forEach(product => addToCart(product, true));
  };

  const removeFromCart = (productId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCustomPackagingName("");
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const bundleItems = items.filter(item => item.isBundle);
    const bundleDiscount = bundleItems.length > 0 ? subtotal * 0.15 : 0; // 15% discount for bundle items
    return Math.max(0, subtotal - bundleDiscount);
  };

  const getBundleDiscount = () => {
    const bundleItems = items.filter(item => item.isBundle);
    if (bundleItems.length === 0) return 0;
    const bundleSubtotal = bundleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return bundleSubtotal * 0.15;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        customPackagingName,
        setCustomPackagingName,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getBundleDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};