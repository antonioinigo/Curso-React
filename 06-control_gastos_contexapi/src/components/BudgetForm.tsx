import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"



function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
        
    }

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        dispatch({type:'add-budget', payload:{budget}})
    }


    const isValid=useMemo(()=>{
        return isNaN(budget) || budget <= 0
    }, [budget])

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Introduce tu presupuesto
                </label>
                <input 
                    type="number"
                    id="budget"
                    className="w-full bg-white border border-gray-200 rounded-lg p-2"
                    placeholder="Ejemplo: 3000"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />

            </div>

            <input  
                type="submit"
                value="Agregar presupuesto"
                className= "w-full bg-blue-600 hover:bg-blue-700 text-white font-black p-2 rounded-lg uppercase disabled:opacity-50"
                disabled={isValid}
                
            />


        </form>
    )
}

export default BudgetForm
