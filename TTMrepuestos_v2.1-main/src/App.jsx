import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Pedido from './pages/Pedido'
import Envio from './pages/Envio'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Index}/>
        <Route path='/registro' Component={Registro}/>
        <Route path='/login' Component={Login}/>
        <Route path='/catalogo' Component={Catalogo}/>
        <Route path='/carrito' Component={Carrito}/>
        <Route path='/pedido' Component={Pedido}/>
        <Route path='/envio' Component={Envio}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App
