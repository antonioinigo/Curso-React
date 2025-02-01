import { useMemo } from "react"
import { OrderITem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderAction } from "../reducers/order-reducer"

type OrderTotalsProps = {
    order: OrderITem[]
    tip: number
    dispatch: React.Dispatch<OrderAction>
}

function OrderTotals({order, tip, dispatch}: OrderTotalsProps) {

    const subtotalAmount =useMemo(()=> order.reduce((total, item)=> total +(item.quantity*item.price), 0) , [order])

    const tipAmount =useMemo(()=> subtotalAmount*tip, [order, tip])

    const totalAmount =useMemo(()=> subtotalAmount+tipAmount, [order, tip])


  return (
    <>
        <div className='space-y-3'>
            <h2 className='font-black text-2xl'>Totales y Propinas</h2>
            <p>Subtotal a pagar: {""} 
                <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
            </p>
            <p>Propina: {""} 
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>
            <p>Total a pagar: {""} 
                <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>
        

        </div>

        <button
            className="w-full uppercase bg-teal-400 text-white px-5 py-3 rounded-lg font-bold disabled:opacity-50"
            disabled={totalAmount===0}
            onClick={()=>dispatch({type:'place-order'})}

        >
            Guardar Pedido
        </button>
      
    </>
  )
}

export default OrderTotals
