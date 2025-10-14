import React, { useState, useRef, useEffect } from 'react';
import '../styles/App.css';

const Registro = () => {
    // Referencias para los campos del formulario
    const nombreRef = useRef(null);
    const apellidoRef = useRef(null);
    const emailRef = useRef(null);
    const telefonoRef = useRef(null);
    const empresaRef = useRef(null);
    const codigoRef = useRef(null);
    const clave1Ref = useRef(null);
    const clave2Ref = useRef(null);
    const edadRef = useRef(null);
    const formRef = useRef(null);

    // Estados para manejar errores
    const [errores, setErrores] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        empresa: '',
        codigo: '',
        password: '',
        confirmPassword: '',
        edad: '',
        terminos: false,
        newsletter: false
    });

    // Función para mostrar error
    const mostrarError = (campo, mensaje) => {
        setErrores(prev => ({
            ...prev,
            [campo]: mensaje
        }));
    };

    // Manejadores de cambio
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Validaciones en tiempo real
    useEffect(() => {
        if (formData.nombre.trim() === "") {
            mostrarError('nombre', "El nombre es obligatorio");
        } else {
            mostrarError('nombre', null);
        }
    }, [formData.nombre]);

    useEffect(() => {
        if (formData.apellido.trim() === "") {
            mostrarError('apellido', "El apellido es obligatorio");
        } else {
            mostrarError('apellido', null);
        }
    }, [formData.apellido]);

    useEffect(() => {
        if (formData.email.trim() === "") {
            mostrarError('email', "El email es obligatorio");
        } else if (!formData.email.includes("@")) {
            mostrarError('email', "Debe contener @");
        } else {
            mostrarError('email', null);
        }
    }, [formData.email]);

    useEffect(() => {
        if (formData.telefono.length === 0) {
            mostrarError('telefono', "El teléfono es obligatorio");
        } else if (formData.telefono.length < 9) {
            mostrarError('telefono', "Ingrese un teléfono válido con más de 9 digitos");
        } else {
            mostrarError('telefono', null);
        }
    }, [formData.telefono]);

    useEffect(() => {
        if (formData.password === "") {
            mostrarError('password', "La contraseña es obligatoria");
        } else if (formData.password.length < 8) {
            mostrarError('password', "Mínimo 8 caracteres");
        } else {
            mostrarError('password', null);
        }

        // Verificar confirmación si tiene contenido
        if (formData.confirmPassword !== "") {
            if (formData.password !== formData.confirmPassword) {
                mostrarError('confirmPassword', "Las contraseñas no coinciden");
            } else {
                mostrarError('confirmPassword', null);
            }
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        if (formData.confirmPassword === "") {
            mostrarError('confirmPassword', "Confirma tu contraseña");
        } else if (formData.password !== formData.confirmPassword) {
            mostrarError('confirmPassword', "Las contraseñas no coinciden");
        } else {
            mostrarError('confirmPassword', null);
        }
    }, [formData.confirmPassword, formData.password]);

    useEffect(() => {
        if (formData.edad === "") {
            mostrarError('edad', "La edad es obligatoria");
        } else if (parseInt(formData.edad) < 18) {
            mostrarError('edad', "Edad mínima: 18 años");
        } else {
            mostrarError('edad', null);
        }
    }, [formData.edad]);

    useEffect(() => {
        // Solo validar si ya hay un código TTM10EMPRE ingresado
        if (formData.codigo === "TTM10EMPRE") {
            if (formData.empresa === "SOPROCAL") {
                // Empresa correcta, limpiar errores
                mostrarError('empresa', null);
                mostrarError('codigo', null);
            } else {
                // Código TTM10EMPRE requiere empresa SOPROCAL
                mostrarError('empresa', "Debe ingresar el nombre de su empresa para usar este código");
            }
        } else {
            // Si no hay código TTM10EMPRE, no mostrar error en empresa
            mostrarError('empresa', null);
        }
    }, [formData.empresa, formData.codigo]);

    useEffect(() => {
        if (formData.codigo.trim() === "") {
            mostrarError('codigo', null);
            mostrarError('empresa', null); // Limpiar también el error de empresa
        } 
        else if (formData.codigo === "FIEL40") {
            mostrarError('codigo', null);
            mostrarError('empresa', null); // Limpiar error de empresa para otros códigos válidos
        } 
        else if (formData.codigo === "TTM10EMPRE") {
            if (formData.empresa === "SOPROCAL") {
                mostrarError('codigo', null);
                mostrarError('empresa', null);
            } else {
                mostrarError('codigo', "Debe ingresar el nombre de su empresa para usar este código");
            }
        } 
        else {
            mostrarError('codigo', "Código inválido");
            mostrarError('empresa', null); // Limpiar error de empresa para códigos inválidos
        }
    }, [formData.codigo, formData.empresa]);

    // Validación al enviar
    const handleSubmit = (e) => {
        e.preventDefault();
        
        let hayErrores = Object.values(errores).some(error => error !== null);
        
        if (hayErrores || !formData.terminos) {
            alert("Por favor corrige los errores antes de continuar y acepta los términos y condiciones");
            return;
        }

        // Si todo está bien, proceder con el envío del formulario
        console.log('Formulario enviado:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al servidor
    };

    return (
        <div className="registro-body">
            <section className="contacto-section">
                <div style={{ marginBottom: '2rem' }}>
                    <img className="logo-contacto" src="img/logo3.png" alt="logo" />
                    <h3>CONTACTO</h3>
                    <p>★ Whatsapp: +569123123</p>
                    <p>☎ Llamadas: 123123123</p>
                    <p>✉ Correo: truck&trailer.melipilla@gmail.com</p>
                </div>

                <a href="/" className="btn-index">Volver a la pagina principal</a>
            </section>
            
            <div className="registro-container">
                <div className="logo-section">
                    <h1>Truck & Trailer Melipilla</h1>
                    <p>Crea tu cuenta para acceder a repuestos de calidad</p>
                </div>

                <form ref={formRef} id="registroForm" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre *</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                required 
                                placeholder="Tu nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={errores.nombre ? 'error' : ''}
                            />
                            {errores.nombre && <small className="error-text">{errores.nombre}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido *</label>
                            <input 
                                type="text" 
                                id="apellido" 
                                name="apellido" 
                                required 
                                placeholder="Tu apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className={errores.apellido ? 'error' : ''}
                            />
                            {errores.apellido && <small className="error-text">{errores.apellido}</small>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errores.email ? 'error' : ''}
                        />
                        {errores.email && <small className="error-text">{errores.email}</small>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono *</label>
                            <input 
                                type="tel" 
                                id="telefono" 
                                name="telefono" 
                                required 
                                placeholder="912345678"
                                value={formData.telefono}
                                onChange={handleChange}
                                className={errores.telefono ? 'error' : ''}
                            />
                            {errores.telefono && <small className="error-text">{errores.telefono}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="edad">Edad *</label>
                            <input 
                                type="number" 
                                id="edad" 
                                name="edad" 
                                required 
                                placeholder="18" 
                                min="18" 
                                max="100"
                                value={formData.edad}
                                onChange={handleChange}
                                className={errores.edad ? 'error' : ''}
                            />
                            {errores.edad && <small className="error-text">{errores.edad}</small>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="empresa">Empresa (Opcional)</label>
                        <input 
                            type="text" 
                            id="empresa" 
                            name="empresa" 
                            placeholder="Nombre de tu empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            className={errores.empresa ? 'error' : ''}
                        />
                        {errores.empresa && <small className="error-text">{errores.empresa}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="codigo">Codigo descuento (opcional)</label>
                        <input 
                            type="text" 
                            id="codigo" 
                            name="codigo" 
                            placeholder="TTMCODIGO"
                            value={formData.codigo}
                            onChange={handleChange}
                            className={errores.codigo ? 'error' : ''}
                        />
                        {errores.codigo && <small className="error-text">{errores.codigo}</small>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Contraseña *</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                placeholder="Mínimo 8 caracteres"
                                value={formData.password}
                                onChange={handleChange}
                                className={errores.password ? 'error' : ''}
                            />
                            {errores.password && <small className="error-text">{errores.password}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                required 
                                placeholder="Repite tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errores.confirmPassword ? 'error' : ''}
                            />
                            {errores.confirmPassword && <small className="error-text">{errores.confirmPassword}</small>}
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="terminos" 
                            name="terminos" 
                            required
                            checked={formData.terminos}
                            onChange={handleChange}
                        />
                        <label htmlFor="terminos">
                            Acepto los <a href="#" target="_blank">términos y condiciones</a> y la 
                            <a href="#" target="_blank">política de privacidad</a>
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="newsletter" 
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleChange}
                        />
                        <label htmlFor="newsletter">
                            Quiero recibir ofertas y novedades por email
                        </label>
                    </div>

                    <button type="submit" className="btn-registro">Crear mi cuenta</button>

                    <div className="login-link">
                        <p>¿Ya tienes una cuenta?</p>
                        <a href="/login">Iniciar Sesión</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;