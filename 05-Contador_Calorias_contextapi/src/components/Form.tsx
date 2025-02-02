import {  useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"
import { Activity } from "../types"
import { categories } from "../data/categories"

import { useActivity } from "../hooks/useActivity"



const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

function Form() {

    const {state, dispatch} = useActivity()
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
             const selectActivity =state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0]
            setActivity(selectActivity)
        }

    },[state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        const isNumberField=["category","calories"].includes(e.target.id)



        setActivity({
            ...activity,
            [e.target.id]:isNumberField ?  +e.target.value : e.target.value
        })
    }
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity
            }
        })
        setActivity({...initialState, id: uuidv4()})
    }

    
    

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="cateogry" className="font-bold">Categoria:</label>
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category=>(
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                type="text"  
                id="name" 
                className="border border-slate-300 p-2 rounded-lg "
                placeholder="Ej. Comida, Ensalada, Ejercicio, Pesas... "
                value={activity.name}
                onChange={handleChange}

            
            />
        
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input 
                type="number"  
                id="calories" 
                className="border border-slate-300 p-2 rounded-lg "
                placeholder="Ej. 200 "
                value={activity.calories}
                onChange={handleChange}
            
            />
        </div>
        <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold p-2 w-full uppercase cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Agregar Comida" : "Agregar Ejercicio"}
        disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form
