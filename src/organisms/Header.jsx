import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      {/* Estilos CSS para el Header */}
      <style>{`
        /* Importar fuentes globales */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        /* === HEADER === */
        header.primera {
            height: 150px;
            width: 100%;
            display: flex;
            column-gap: 1rem;
            justify-content: space-between;
            align-items: center;
            background-color: #000000;
            padding: 0px 2rem;
            flex-wrap: wrap; /* Para responsividad */
        }

        nav.opciones {
            padding-left: 10px;
            display: flex;
            column-gap: .1rem;
            flex-wrap: wrap; /* Para responsividad */
            justify-content: center;
        }

        .opciones > a {
            color: #5a8756;
            font-family: "Oswald", sans-serif;
            font-weight: 1000;
            font-size: 2rem;
            display: flex;
            justify-content: space-between;
            padding: 3rem;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        #logo {
            display: flex;
            align-content: center;
            height: 10rem;
            width: 10rem;
            padding: 5px 5px;
            flex-shrink: 0;
        }

        #logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .botones-auth {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-shrink: 0;
        }

        .botones-auth a.boton-inicio, 
        .botones-auth a.boton-registro {
            font-family: "Oswald", sans-serif;
            display: flex;
            padding: 10px 20px;
            align-items: center;
            background-color: #5a8756;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 120px;
            height: 50px;
            text-decoration: none;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 600;
            white-space: nowrap;
        }

        .botones-auth a.boton-inicio:hover,
        .botones-auth a.boton-registro:hover {
            background-color: #4a7349;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(90, 135, 86, 0.3);
        }

        /* === MEDIA QUERIES PARA HEADER === */
        @media (max-width: 900px) {
            header.primera {
                flex-direction: column;
                height: auto;
                padding: 1rem;
                gap: 1rem;
            }
            
            nav.opciones {
                padding-left: 0;
                justify-content: center;
            }
            
            .opciones > a {
                font-size: 1.5rem;
                padding: 1.5rem;
            }
            
            #logo {
                height: 8rem;
                width: 8rem;
            }
        }

        @media (max-width: 480px) {
            nav.opciones {
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .opciones > a {
                font-size: 1.2rem;
                padding: 0.5rem 1rem;
            }
            
            #logo {
                height: 6rem;
                width: 6rem;
            }

            .botones-auth {
                flex-direction: column;
                width: 100%;
                gap: 10px;
            }
            
            .botones-auth a.boton-inicio,
            .botones-auth a.boton-registro {
                min-width: 100%;
            }
        }
      `}</style>

      {/* Contenido JSX del Header */}
      <header className="primera">
        <div id="logo">
          <img src="img/logo3.png" alt="logo" />
        </div>

        <nav className="opciones">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrito">Carrito</Link>
          <Link to="/pedido">Pedido</Link>
          <Link to="/envio">Envio</Link>
        </nav>
        
        <div className="botones-auth">
          <Link to="/login" className="boton-inicio">Iniciar Sesión</Link>
          <Link to="/registro" className="boton-registro">Registrarse</Link>
        </div>
      </header>
    </>
  );
}
