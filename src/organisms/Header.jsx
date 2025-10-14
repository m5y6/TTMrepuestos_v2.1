import React from 'react'
export default function Header() {
  return (
    <header className="primera">
        <div id="logo">
          <img src="img/logo3.png" alt="logo" />
        </div>

        <nav className="opciones">
          <a href="index.html">Inicio</a>
          <a href="catalogo.html">Catálogo</a>
          <a href="carrito.html">Carrito</a>
          <a href="pedido.html">Pedido</a>
          <a href="envio.html">Envio</a>
        </nav>
        
        <div className="botones-auth">
          <a href="login.html" className="boton-inicio">Iniciar Sesión</a>
          <a href="registrarse.html" className="boton-registro">Registrarse</a>
        </div>
      </header>
  )
}
