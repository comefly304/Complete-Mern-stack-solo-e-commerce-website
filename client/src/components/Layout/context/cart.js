import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext(); //create context

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);

  //default axios auth

  useEffect(()=>{
    let existingcart=localStorage.getItem("cart")
    if(existingcart) setcart(JSON.parse(existingcart))

  },[])

  return (
    <CartContext.Provider value={[cart, setcart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
