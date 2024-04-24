import { db } from "../data/db";
import { CartItem, Guitar } from "../types";
//NOTE - actions
export type CartActions = 
{type:"add-to-cart", payload: {item:Guitar}}|
{type:"remove-from-cart", payload: {id:Guitar["id"]}}|
{type:"decrease-quantity", payload: {id:Guitar["id"]}}|
{type:"increase-quantity", payload: {id:Guitar["id"]}}|
{type:"clear-cart"}

//NOTE - states
export type CartState = {
    data:Guitar[]
    cart:CartItem[]
}

//NOTE - Initial state
export const initialState : CartState = {
    data:db,
    cart:[]
}