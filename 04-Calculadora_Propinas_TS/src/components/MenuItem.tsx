import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem
    addItem: (item: MenuItem)=>void;
}

function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    <button 
        className="border-2 border-teal-400  w-full p-3 hover:bg-teal-200 flex justify-between items-center"
        onClick={()=>addItem(item)}
    >
        <p>{item.name}</p>
        <p className="font-black">${item.price}</p>
    </button>
  )
}

export default MenuItem
