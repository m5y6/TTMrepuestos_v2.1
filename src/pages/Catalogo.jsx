import React, { useState, useEffect, useRef } from 'react';
import '../styles/Catalogo.css';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';


const Catalogo = () => {
    // Base de datos de productos
    const [productos] = useState([
        {
            id: 1,
            nombre: "Filtro de Aceite Volvo",
            descripcion: "Filtro de aceite original para motores Volvo D12 y D13",
            precio: 45000,
            categoria: "filtros",
            imagen: "img/filtro2.png"
        },
        {
            id: 2,
            nombre: "Pastillas de Freno Meritor",
            descripcion: "Pastillas de freno de alta calidad para ejes Meritor",
            precio: 125000,
            categoria: "frenos",
            imagen: "img/pastilla.png"
        },
        {
            id: 3,
            nombre: "Amortiguador Trasero Scania",
            descripcion: "Amortiguador trasero para Scania Serie R y Serie G",
            precio: 185000,
            categoria: "suspension",
            imagen: "img/amortiguador.png"
        },
        {
            id: 4,
            nombre: "Bomba de Agua Detroit",
            descripcion: "Bomba de agua para motores Detroit Diesel Serie 60",
            precio: 320000,
            categoria: "motor",
            imagen: "img/bombaagua.jpg"
        },
        {
            id: 5,
            nombre: "Neumático Bridgestone 295/80R22.5",
            descripcion: "Neumático para camión y remolque, excelente durabilidad",
            precio: 450000,
            categoria: "neumaticos",
            imagen: "img/neumatico2.png"
        },
        {
            id: 6,
            nombre: "Bateria wena",
            descripcion: "Alternador de 24 voltios, 150 amperios para camiones pesados",
            precio: 285000,
            categoria: "electrico",
            imagen: "img/bateria.png"
        },
        {
            id: 7,
            nombre: "Disco de Freno Brembo",
            descripcion: "Disco de freno ventilado para ejes delanteros",
            precio: 95000,
            categoria: "frenos",
            imagen: "img/Disco.jpg"
        },
        {
            id: 8,
            nombre: "Filtro de Aire K&N",
            descripcion: "Filtro de aire de alto flujo, lavable y reutilizable",
            precio: 75000,
            categoria: "filtros",
            imagen: "img/filtro.png"
        },
        {
            id: 9,
            nombre: "Correa de Distribución Gates",
            descripcion: "Correa de distribución para motores diésel pesados",
            precio: 85000,
            categoria: "motor",
            imagen: "img/correa.jpg"
        },
        {
            id: 10,
            nombre: "Sensor ABS Knorr-Bremse",
            descripcion: "Sensor de velocidad para sistema ABS en ejes traseros",
            precio: 65000,
            categoria: "electrico",
            imagen: "img/sensot.png"
        },
        {
            id: 11,
            nombre: "Muelle de Suspensión",
            descripcion: "Muelle parabólico para suspensión trasera de camiones",
            precio: 220000,
            categoria: "suspension",
            imagen: "img/muelle.png"
        },
        {
            id: 12,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        },
        {
            id: 13,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        },
        {
            id: 14,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        },
        {
            id: 15,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        },
        {
            id: 16,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        },
        {
            id: 17,
            nombre: "Neumático Michelin 315/70R22.5",
            descripcion: "Neumático direccional para ejes delanteros",
            precio: 520000,
            categoria: "neumaticos",
            imagen: "img/michellin.jpg"
        }
    ]);

    // Estados
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [filtros, setFiltros] = useState({
        categorias: [],
        precioMin: '',
        precioMax: '',
        orden: 'relevancia',
        busqueda: ''
    });
    const [paginaActual, setPaginaActual] = useState(1);
    const [notificacion, setNotificacion] = useState('');
    const productosPorPagina = 15;

    // Referencias
    const catalogoContentRef = useRef(null);

    // Inicializar productos filtrados
    useEffect(() => {
        setProductosFiltrados([...productos]);
    }, [productos]);

    // Formatear precio
    const formatearPrecio = (precio) => {
        return '$' + precio.toLocaleString('es-CL');
    };

    // Aplicar filtros
    const aplicarFiltros = () => {
        let resultado = [...productos];

        // Filtrar por búsqueda
        if (filtros.busqueda.trim() !== '') {
            const termino = filtros.busqueda.toLowerCase().trim();
            resultado = resultado.filter(producto =>
                producto.nombre.toLowerCase().includes(termino) ||
                producto.descripcion.toLowerCase().includes(termino) ||
                producto.categoria.toLowerCase().includes(termino)
            );
        }

        // Filtrar por categorías
        if (filtros.categorias.length > 0) {
            resultado = resultado.filter(p => filtros.categorias.includes(p.categoria));
        }

        // Filtrar por precio
        const min = parseInt(filtros.precioMin) || 0;
        const max = parseInt(filtros.precioMax) || Infinity;
        resultado = resultado.filter(p => p.precio >= min && p.precio <= max);

        // Ordenar
        switch (filtros.orden) {
            case 'precio-asc':
                resultado.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                resultado.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre-asc':
                resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre-desc':
                resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                // Relevancia - mantener orden original
                break;
        }

        setProductosFiltrados(resultado);
        setPaginaActual(1);
    };

    // Limpiar filtros
    const limpiarFiltros = () => {
        setFiltros({
            categorias: [],
            precioMin: '',
            precioMax: '',
            orden: 'relevancia',
            busqueda: ''
        });
        setProductosFiltrados([...productos]);
        setPaginaActual(1);
    };

    // Manejar cambio de categorías
    const handleCategoriaChange = (categoria) => {
        setFiltros(prev => ({
            ...prev,
            categorias: prev.categorias.includes(categoria)
                ? prev.categorias.filter(c => c !== categoria)
                : [...prev.categorias, categoria]
        }));
    };

    // Manejar cambio de búsqueda
    const handleBusquedaChange = (e) => {
        setFiltros(prev => ({
            ...prev,
            busqueda: e.target.value
        }));
    };

    // Aplicar filtros cuando cambien
    useEffect(() => {
        aplicarFiltros();
    }, [filtros.categorias, filtros.precioMin, filtros.precioMax, filtros.orden]);

    // Aplicar filtros con debounce para búsqueda
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            aplicarFiltros();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [filtros.busqueda]);

    // Agregar al carritto
    const agregarAlCarrito = (producto) => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
    };

    // Mostrar notificación
    const mostrarNotificacion = (mensaje) => {
        setNotificacion(mensaje);
        setTimeout(() => {
            setNotificacion('');
        }, 3000);
    };

    // Paginación
    const productosActuales = productosFiltrados.slice(
        (paginaActual - 1) * productosPorPagina,
        paginaActual * productosPorPagina
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    const irAPagina = (pagina) => {
        setPaginaActual(pagina);
        if (catalogoContentRef.current) {
            catalogoContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
            if (catalogoContentRef.current) {
                catalogoContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
            if (catalogoContentRef.current) {
                catalogoContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // Generar números de páginas
    const generarNumerosPaginas = () => {
        const maxPaginasVisibles = 5;
        let inicio = Math.max(1, paginaActual - 2);
        let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);
        
        if (fin - inicio < maxPaginasVisibles - 1) {
            inicio = Math.max(1, fin - maxPaginasVisibles + 1);
        }
        
        const paginas = [];
        for (let i = inicio; i <= fin; i++) {
            paginas.push(i);
        }
        return paginas;
    };

    function addToCart() {
        const catalogo = JSON.parse(localStorage.getItem('catalogo')) || []
        catalogo.push(props)
        localStorage.setItem('catalogo', JSON.stringify(catalogo))
        console.log(catalogo)
    }

    return (
        <>
        
        {/* <Header/> */}

        <div>
            {/* Header */}
            

            <main>
                <div className="catalogo-hero">
                    <h1>Catálogo de Repuestos</h1>
                    <p>Encuentra los mejores repuestos para tu vehículo de carga</p>
                </div>

                {/* Buscador */}
                <div className="buscador-container">
                    <div className="buscador-wrapper">
                        <div className="buscador-input-container">
                            <svg className="buscador-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input 
                                type="text" 
                                className="buscador-input" 
                                placeholder="Buscar repuestos (nombre, descripción, categoría)..."
                                autoComplete="off"
                                value={filtros.busqueda}
                                onChange={handleBusquedaChange}
                            />
                            <button 
                                type="button" 
                                className="limpiar-buscador" 
                                onClick={() => setFiltros(prev => ({ ...prev, busqueda: '' }))}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="catalogo-container">
                    {/* Sidebar de Filtros */}
                    <aside className="filtros-sidebar">
                        <div className="filtros-header">
                            <h3>Filtrar Productos</h3>
                            <button className="btn-limpiar" onClick={limpiarFiltros}>
                                Limpiar Filtros
                            </button>
                        </div>

                        <div className="filtro-grupo">
                            <h4>Categoría</h4>
                            <div className="filtro-opciones">
                                {['motor', 'frenos', 'suspension', 'electrico', 'neumaticos', 'filtros'].map(categoria => (
                                    <label key={categoria} className="filtro-checkbox">
                                        <input 
                                            type="checkbox" 
                                            checked={filtros.categorias.includes(categoria)}
                                            onChange={() => handleCategoriaChange(categoria)}
                                        />
                                        <span>
                                            {categoria === 'motor' && 'Motor'}
                                            {categoria === 'frenos' && 'Frenos'}
                                            {categoria === 'suspension' && 'Suspensión'}
                                            {categoria === 'electrico' && 'Sistema Eléctrico'}
                                            {categoria === 'neumaticos' && 'Neumáticos'}
                                            {categoria === 'filtros' && 'Filtros'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filtro-grupo">
                            <h4>Rango de Precio</h4>
                            <div className="filtro-precio">
                                <div className="precio-inputs">
                                    <div className="precio-input">
                                        <label>Mínimo</label>
                                        <input 
                                            type="number" 
                                            placeholder="$0" 
                                            min="0" 
                                            step="1000"
                                            value={filtros.precioMin}
                                            onChange={(e) => setFiltros(prev => ({ ...prev, precioMin: e.target.value }))}
                                        />
                                    </div>
                                    <div className="precio-input">
                                        <label>Máximo</label>
                                        <input 
                                            type="number" 
                                            placeholder="$1000000" 
                                            min="0" 
                                            step="1000"
                                            value={filtros.precioMax}
                                            onChange={(e) => setFiltros(prev => ({ ...prev, precioMax: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="filtro-grupo">
                            <h4>Ordenar por</h4>
                            <select 
                                className="select-ordenar"
                                value={filtros.orden}
                                onChange={(e) => setFiltros(prev => ({ ...prev, orden: e.target.value }))}
                            >
                                <option value="relevancia">Relevancia</option>
                                <option value="precio-asc">Precio: Menor a Mayor</option>
                                <option value="precio-desc">Precio: Mayor a Menor</option>
                                <option value="nombre-asc">Nombre: A-Z</option>
                                <option value="nombre-desc">Nombre: Z-A</option>
                            </select>
                        </div>
                    </aside>

                    {/* Contenido del Catálogo */}
                    <div ref={catalogoContentRef} className="catalogo-content">
                        <div className="catalogo-header">
                            <div className="resultados-info">
                                <span>
                                    Mostrando <strong>{(paginaActual - 1) * productosPorPagina + 1}-{Math.min(paginaActual * productosPorPagina, productosFiltrados.length)}</strong> de <strong>{productosFiltrados.length}</strong> productos
                                </span>
                            </div>
                        </div>

                        <div className="productos-grid">
                            {productosActuales.map(producto => (
                                <div key={producto.id} className="producto-card">
                                    <div className="producto-imagen">
                                        <img 
                                            src={producto.imagen} 
                                            alt={producto.nombre} 
                                            onError={(e) => {
                                                e.target.src = 'img/placeholder.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="producto-info">
                                        <h3 className="producto-nombre">{producto.nombre}</h3>
                                        <p className="producto-descripcion">{producto.descripcion}</p>
                                        <div className="producto-precio">{formatearPrecio(producto.precio)}</div>
                                        <div className="producto-acciones">
                                            <button 
                                                className="btn-carrito" 
                                                onClick={() => addToCart()}
                                            >Agregar al Carrito</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPaginas > 1 && (
                            <div className="paginacion">
                                <button 
                                    className="btn-pag" 
                                    onClick={paginaAnterior}
                                    disabled={paginaActual === 1}
                                >
                                    Anterior
                                </button>
                                <div className="numeros-pag">
                                    {generarNumerosPaginas().map(pagina => (
                                        <button
                                            key={pagina}
                                            className={`btn-pag ${pagina === paginaActual ? 'active' : ''}`}
                                            onClick={() => irAPagina(pagina)}
                                        >
                                            {pagina}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    className="btn-pag" 
                                    onClick={paginaSiguiente}
                                    disabled={paginaActual === totalPaginas || totalPaginas === 0}
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            

            {/* Notificación */}
            {notificacion && (
                <div className="notificacion-carrito">
                    {notificacion}
                </div>
            )}
        </div>
        

        <Footer/>
        </>
    );
};

export default Catalogo;