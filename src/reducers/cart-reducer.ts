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
    const itemExist = state.cart.find((e) => e.id === action.payload.item.id);
    let updatedCart: CartItem[] = [];

    if (itemExist) {
      updatedCart = state.cart.map((e) => {
        if (e.id === action.payload.item.id) {
          if (e.quantity >= 5) return e;
          const updatedItem = {...e, quantity: e.quantity + 1};
          return updatedItem;
        }
        return e;
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter(e=>e.id!== action.payload.id);
    return {
      ...state,
      cart:updatedCart
    };
  }

  if (action.type === "increase-quantity") {

    const updatedCart = state.cart.map((e) => {
        if (e.id === action.payload.id && e.quantity < 5) {
            return {
                ...e,
                quantity: e.quantity + 1
            }
        }
        return e;
    });

    return {
      ...state,
      cart:updatedCart
    };
  }

  if (action.type === "decrease-quantity") {
    const updatedCart = state.cart.map((e) => {
        if (e.id === action.payload.id && e.quantity > 1) {
            return {
                ...e,
                quantity: e.quantity - 1
            }
        }
        return e;
    });

    return {
      ...state,
      cart:updatedCart
    };
  }

  if (action.type === "clear-cart") {

    return {
      ...state,
      cart:[]
    };
  }

  return state;
};
