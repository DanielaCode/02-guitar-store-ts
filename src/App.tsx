import { useReducer } from "react";
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import useCart from "./hooks/useCart"
import { cartReducer, initialState } from "./reducers/cart-reducer";

//this website will be deploy in netlify
function App() {
  const {
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [state,dispatch] = useReducer(cartReducer,initialState);
  return (
    <>
      <Header
        cart = {state.cart}
        removeItem = {removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}        
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            state.data.map((e)=>(
              <Guitar 
                key={e.id} 
                guitar={e}
                dispatch={dispatch}
                />
            ))
          }
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
