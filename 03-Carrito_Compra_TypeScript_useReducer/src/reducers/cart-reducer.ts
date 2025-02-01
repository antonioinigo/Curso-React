import { db } from "../data/db";
import { Guitar, CartItem } from "../types";

export type CartActions=
    {type:'add-to-cart',payload: {item:Guitar}} |
    {type:'remove-from-cart',payload: {id:Guitar['id']}} |
    {type:'decrese-quantity',payload: {id:Guitar['id']}} |
    {type:'increase-quantity',payload: {id:Guitar['id']}} |
    {type:'clear-cart'}

export type CartState={
    data: Guitar[],
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  

export const initialState: CartState={
    data:db,
    cart: initialCart()
}

export const CartReducer=(
    state: CartState = initialState,
    action: CartActions
)=>{

    if (action.type === 'add-to-cart'){
        const itemExists=state.cart.find((guitar)=> guitar.id === action.payload.item.id)
        let uppdatedCart : CartItem[] = []
        if(itemExists){
            uppdatedCart = state.cart.map(item=>{
                if(item.id === action.payload.item.id){
                    if(item.quantity<5){
                        return{
                            ...item,
                            quantity:item.quantity+1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }

            })
        }else{
            const newItem : CartItem ={...action.payload.item, quantity:1}
            uppdatedCart = [...state.cart, newItem]
        } 
       
        return {
        ...state,
        cart: uppdatedCart
       }
    }
    

    if (action.type === 'remove-from-cart'){
       
       const cart = state.cart.filter((guitar)=> guitar.id !== action.payload.id)

        return {
            ...state,
            cart
       }
    }

    if (action.type === 'decrese-quantity'){
        const cart=state.cart.map(item=>{
            if(item.id === action.payload.id){
              return{
                ...item,
                quantity:item.quantity-1
              }
            }
            return item
          })
            
       
        return {
        ...state,
        cart
       }
    }

    if (action.type === 'increase-quantity'){
        const cart=state.cart.map(item=>{
            if(item.id === action.payload.id){
              return{
                ...item,
                quantity:item.quantity+1
              }
            }
            return item
          })
            
       
        return {
        ...state,
        cart
       }
    }

    if (action.type === 'clear-cart'){
       
       
        return {
        ...state,
        cart: []
       }
    }
}