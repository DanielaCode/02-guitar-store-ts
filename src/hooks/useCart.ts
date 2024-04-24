import { useEffect, useState } from "react"
import type { CartItem } from "../types";


function useCart() {

    const storageInitialCart = () : CartItem[]=> {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
 
    const [cart, setCart] = useState(storageInitialCart);

    useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)) }, [cart])
    //manage secundary effects of the change of an state so any time cart change this will happen
   

    return {
        cart,
    }
}

export default useCart;