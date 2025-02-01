import { OrderAction } from "../reducers/order-reducer"
import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem
    dispatch: React.Dispatch<OrderAction>
}

function MenuItem({ item, dispatch }: MenuItemProps) {
  return (
    <button 
        className="border-2 border-teal-400  w-full p-3 hover:bg-teal-200 flex justify-between items-center"
        onClick={()=>dispatch({type:'add-item', payload:{item}})}
    >
        <p>{item.name}</p>
        <p className="font-black">${item.price}</p>
    </button>
  )
}

export default MenuItem
