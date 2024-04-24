import { db } from "../data/db";
import { CartItem, Guitar } from "../types";
//NOTE - actions
export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

//NOTE - states
export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

//NOTE - Initial state
export const initialState: CartState = {
  data: db,
  cart: [],
};

//NOTE - reducer, todo lonhecho arriba es para tener autocompletado aca
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    console.log(action.payload.item)
     const itemExist =state.cart.findIndex(e => e.id === action.payload.item.id);
     let updatedCart: CartItem[]= [];
     if (itemExist >= 0) {
         if (state.cart[itemExist].quantity >= 5)
             return;
          updatedCart = [...state.cart];
         updatedCart[itemExist].quantity++;
     } else {
         const newItem:CartItem= {...action.payload.item,quantity:1}
         updatedCart=[...state.cart,newItem]
     }

    return {
      ...state,
      cart: updatedCart
    };
  }

  if (action.type === "remove-from-cart") {
    return {
      ...state,
    };
  }

  if (action.type === "increase-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "decrease-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
    };
  }

  return state;
};
