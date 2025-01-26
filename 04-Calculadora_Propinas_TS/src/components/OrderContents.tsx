import { OrderITem, MenuItem } from '../types'
import { formatCurrency } from '../helpers'

type OrderContentsProps = {
  order: OrderITem[],
  removeItem: (id: MenuItem["id"])=>void
}

function OrderContents({order, removeItem}: OrderContentsProps) {
  return (
    <div>
        <h2 className="text-4xl font-black">Consumo</h2> 

        <div className='space-y-3 mt-5'>
          {order.map((item)=>(
              <div 
                key={item.id}
                className='flex justify-between items-center border-t border-gray-300 py-5 last-of-type:border-b'
              >
                <div>
                  <p className='text-lg'>
                    {item.name} - {formatCurrency(item.price)}
                  </p>
                  <p className='font-black'>
                    Cantidad: {item.quantity} - {formatCurrency(item.price*item.quantity)}
                  </p>
                </div>
               
                <button
                  className='bg-red-500 text-white px-3 py-1 rounded-lg'
                  onClick={()=>removeItem(item.id)}
                  >
                  X
                </button>
              </div>
              
            ))
          }
         

        </div>
    </div>
  )
}

export default OrderContents
