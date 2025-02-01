import { MenuItem, OrderITem } from "../types"

export type OrderAction=
{type:'add-item', payload:{item:MenuItem}}|
{type:'remove-item', payload:{id:MenuItem["id"]}}|
{type:'place-order'}|
{type: 'add-tip', payload:{value:number}}

export type OderState={
    order:OrderITem[],
    tip: number
}


export const initialState: OderState={
    order:[],
    tip: 0
}

export const orderReducer=(state:OderState=initialState, action:OrderAction)=>{

    if(action.type==='add-item'){

        const itemExist =state.order.find(orderItem=>orderItem.id===action.payload.item.id);
        let order :OrderITem[]=[]
        if(itemExist){
            order =state.order.map(orderItem=>orderItem.id===action.payload.item.id?{...orderItem, quantity: orderItem.quantity+1}:orderItem);
            

        }else{
            const newItem: OrderITem = {...action.payload.item, quantity: 1};
            order=[...state.order, newItem];
        }
       
        return{
            ...state,
            order
       
        }
    }

    if(action.type==='remove-item'){
        const order =state.order.filter(item=>item.id!==action.payload.id);
        return{
            ...state,
            order
            
        }
    }

    if(action.type==='place-order'){
        
        return{
                ...state,
                order :[],
                tip:0
        }
    }

    if(action.type==='add-tip'){
        const tip = action.payload.value;
        return{
            ...state,
            tip
           
        }
    }

    return state
}




    
