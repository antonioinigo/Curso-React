import { useReducer, useEffect } from "react"
import Header from "./components/Header.js"
import Guitar from "./components/Guitar.js"

import { CartReducer, initialState } from "./reducers/cart-reducer.js"


function App() {



 const [state, dispatch] = useReducer(CartReducer, initialState)

   
     useEffect(() => {
       localStorage.setItem('cart', JSON.stringify(state?.cart))
     }, [state?.cart])



  return (
    <>
     
    <Header 
      cart={state?.cart || []}
      dispatch={dispatch}
      
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state?.data.map((guitar)=>(
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}

            />
            ))}
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App


