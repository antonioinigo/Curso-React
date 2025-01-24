import { useState, useEffect } from 'react'
import {db} from "../data/db.js"
import {useMemo} from 'react'
import type { Guitar, CartItem } from '../types'


export const useCart = () => {
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
      
      
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)
    
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    function addToCart(item : Guitar){
    
      const itemExists=cart.findIndex((guitar)=> guitar.id === item.id)
      if(itemExists >= 0){
        const uppdatedCart=[...cart]
        uppdatedCart[itemExists].quantity++
        setCart(uppdatedCart)
      }else{
        const newItem : CartItem ={...item, quantity:1}
        setCart([...cart, newItem])
      } 
    }
    
    function removeFromCart(id: Guitar['id']){
      setCart((prevCart)=>prevCart.filter((guitar)=> guitar.id !== id))
    }
    
    function increaseQuantity(id: Guitar['id']){
      const uppdatedCart=cart.map(item=>{
        if(item.id === id){
          return{
            ...item,
            quantity:item.quantity+1
          }
        }
        return item
      })
        setCart(uppdatedCart)
      
    }
    
    function decreaseQuantity(id: Guitar['id']){
      const uppdatedCart=cart.map(item=>{
        if(item.id === id){
          return{
            ...item,
            quantity:item.quantity-1
          }
        }
        return item
      })
        setCart(uppdatedCart.filter((item)=>item.quantity>0))
    }
    
    function clearCart(){
      setCart([])
    }

    const isEmpy = useMemo(() => cart.length === 0,[cart])
    const cartTotal = useMemo( () => cart.reduce((total, item)=> total + (item.price * item.quantity), 0),[cart])

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpy,
        cartTotal


    }

}


