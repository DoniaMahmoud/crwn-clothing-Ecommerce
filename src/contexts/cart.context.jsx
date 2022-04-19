import { createContext, useState, useEffect } from "react";

//CHECK IF PRODUCT ALREADY EXISTS OR NOT
const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contain productToAdd
  // Same as map , find func that will exit giving the cartItem that return the true boolean
  //based on the callback
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //If found , increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems/ new cart item
  //empty cart case (adding product for the first time)
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

/*
PRODUCT
{
  ID,
  NAME,
  PRICE,
  IMAGEURL,
}
CART ITEM
{
  ID,
  NAME,
  PRICE,
  IMAGEURL,
  QUANTITY
}

*/
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  //re-count total quantity everytime cartItem changes
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
