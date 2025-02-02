import { useEffect, useState } from "react";
import { categories } from "../data/Categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";




function ExpenseForm() {

    

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })
    
     const [error, setError] = useState("")
     const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])
        

    const handleChangeDate=(value: Value)=>{
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value}=e.target
        const isAmountField=['amount'].includes(name)
        
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const habdleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        //validar
        if(Object.values(expense).includes('')){
           setError('Todos los campos son obligatorios')
            return
        }

        //validar limite del presupuesto
        if((expense.amount - previousAmount) > remainingBudget) {
            setError('El gasto supera el presupuesto')
             return
         }

        //validar presupuesto o editar
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: { id: state.editingId, ...expense }} })
        } else {
            dispatch({type: 'add-expense', payload: { expense }})
        }
        
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)

    }
        
    

  return (
    <form className="space-y-4" onSubmit={habdleSubmit}>    
        <legend
            className="uppercase text-2xl font-black text-center border-b-4 border-blue-500 py-2"
        >
         {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'} 
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="expenseName"
            className="text-xl"
            >
                Nombre gasto
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Añade el Nombre del Gasto"
                className="bg-slate-100 p-2 rounded-lg"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="amount"
            className="text-xl"
            >
               Cantidad gasto
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Añade la Cantidad del Gasto"
                className="bg-slate-100 p-2 rounded-lg"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="category"
            className="text-xl"
            >
               Categoría
            </label>
            <select
                id="category"
                className="bg-slate-100 p-2 rounded-lg"
                name="category"
                value={expense.category}
                onChange={handleChange} 
                >
                <option value="">-- Seleccione --</option>
                {categories.map((category)=>(
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select> 
        </div>


        <div className="flex flex-col gap-2">
            <label 
            htmlFor="date"
            className="text-xl"
            >
               Fecha del Gasto
            </label>
            <DatePicker
            className="bg-slate-100 p-2 rounded-lg"
            value={expense.date}
            name="date"
            onChange={handleChangeDate}
            />


            
        </div>

        <input 
        type="submit" 
        className="bg-blue-500 text-white font-bold p-2 rounded-lg cursor-pointer hover:bg-blue-600 uppercase w-full"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}

        />
      
    </form>
  )
}

export default ExpenseForm
