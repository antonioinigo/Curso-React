import React from "react"

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>
    tip: number
}

function TipPercentageForm({setTip, tip}: TipPercentageFormProps) {
  return (
    <div>
       <h3 className="font-black text-2xl">Propina:</h3>
       <form>
            {tipOptions.map((option)=>(
                <div key={option.id} className="flex items-center gap-2">
                 <label htmlFor={option.id}>{option.label} </label>
                 <input 
                 type="radio" 
                 name="tip" 
                 id={option.id} 
                 value={option.value} 
                 onChange={(e)=>setTip(+e.target.value)}
                 checked={tip===option.value}
                 />
                </div>
                
            
            ))}
       </form>
    </div>
  )
}

export default TipPercentageForm
