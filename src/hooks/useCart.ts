import { useEffect, useState } from "react"
import type { Guitar,CartItem } from "../types";

//custom hook 
//allows to separate the presentation(view) from the logic
//allows to reuse logic
//allows to do testing easier
function useCart() {

    const storageInitialCart = () : CartItem[]=> {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
 
    const [cart, setCart] = useState(storageInitialCart);

    useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)) }, [cart])
    //manage secundary effects of the change of an state so any time cart change this will happen

    function increaseQuantity(id:Guitar["id"]) {
        const updatedCart = cart.map((e) => {
            if (e.id === id && e.quantity < 5) {
                return {
                    ...e,
                    quantity: e.quantity + 1
                }
            }
            return e;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function decreaseQuantity(id:Guitar["id"]) {
        const updatedCart = cart.map((e) => {
            if (e.id === id && e.quantity > 1) {
                return {
                    ...e,
                    quantity: e.quantity - 1
                }
            }
            return e;
        });
        setCart(updatedCart);
    }

    return {
        cart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

    }
}

export default useCart;