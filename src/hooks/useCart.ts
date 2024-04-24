import { useEffect, useState,useMemo } from "react"
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


    function removeItem(id:Guitar["id"]) {
        setCart(prevCart => prevCart.filter((e) => e.id !== id));
        //the set function already knows what is in the state
        //and you can used it via callback as it is avoid and the parameter is the previous cart
    }

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

    // function saveLocalStorage(){
    //   localStorage.setItem("cart",JSON.stringify(cart));
    //   //localstorage only save strings
    // }


    //state derivado, keeps the logic out of the template, good practice
    //is not necesary to create multiple states, this is empty still reactive to cart state
    const isEmpty = useMemo(()=>cart.length <= 0,[cart]);
    const cartTotal = useMemo( ()=> cart.reduce((total, e) => total + (e.quantity * e.price), 0),[cart]);
    //useMemo is based on performance, only change if the dependency change(cart), keeps info in cache

    //return an object
    return {
        cart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal

    }
}

export default useCart;