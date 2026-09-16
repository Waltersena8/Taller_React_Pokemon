import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { usePokemon, type Usuario } from "../context/PokemonContext";

export const RegistroUsuario: React.FC = ( ) => {

    const {entrenadores, entrenadorActivo, registrarEntrenador, seleccionarEntrenador} = usePokemon();
    const navigate = useNavigate();

    const [ nombre, setNombre  ] = useState('');
    const [ apellido, setApellido] = useState('');
    const [ tipoDoc, setTipoDoc] = useState('CC');
    const [ dni, setDni ] = useState('');
    const [ pais, setPais] = useState('');
    const [ ciudad, setCiudad ] = useState('');
    const [ celular, setCelular ] = useState('');
    const [ fechaNacimiento, setFechaNacimiento] = useState('');
    const [ correo, setCorreo] = useState('');
    const [ datosPersonales, setDatosPersonales] = useState(false);

    const eventoSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!datosPersonales) {
            alert('Aceptar politica de privacidad')
            return;
        }

        const nuevo: Usuario = {
            id: Date.now(),
            nombreCompleto: `${nombre} ${apellido}`,
            documento: {tipo: tipoDoc, numero: dni},
            fechaNacimiento: fechaNacimiento,
            celular: celular,
            correo,
            recidencia: { pais: pais, ciudad: ciudad},
            datosPersonales: datosPersonales,
            fehcaRegistro: new Date().toLocaleDateString()
        };

        registrarEntrenador(nuevo);
        navigate('/pokemon');
    };

    return(
        <div>
            <header>
                <h2> Registro de entrenadores </h2>
            </header>
            <div>
                <form onSubmit={eventoSubmit}>
                    <div id="grupo-nombre" className="form-group">
                        <label id="label-nombre" htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" value={nombre} onChange={ (e) => setNombre(e.target.value) } required />
                    </div>

                    
                    <div id="grupo-apellido" className="form-group">
                        <label id="label-apellido" htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" placeholder="Apellidos" value={apellido} onChange={ (e) => setApellido(e.target.value)} required />
                    </div>

                    <div id="grupo-tipo-identificacion" className="form-group">
                        <label id="label-tipo-identificacion" htmlFor="tipo_identificacion">Tipo de identificación:</label>
    
                        <select id="tipo_identificacion" name="tipo_identificacion" value={tipoDoc} onChange={ (e) => setTipoDoc(e.target.value) } required >
                                <option value="" disabled selected>Seleccione...</option>
                                <option id="opcion-cc" value="13">Cédula de ciudadanía</option>
                                <option id="opcion-ti" value="12">Tarjeta de identidad</option>
                                <option id="opcion-ce" value="21">Cédula de extranjería</option>
                                <option id="opcion-pe" value="41">Pasaporte</option>
                        </select>
                    </div>

                    <div id="grupo-num-identificacion" className="form-group">
                        <label id="label-num-identificacion" htmlFor="numero_identificacion">Número de identificación:</label>
                        <input type="text" id="numero_identificacion"  name="numero_identificacion" placeholder="Su número de identificación" value={dni} onChange={(e) => setDni(e.target.value)} required />
                    </div>

                    <div id="grupo-nacimiento" className="form-group">
                        <label id="label-nacimiento" htmlFor="nacimiento">Fecha de Nacimiento:</label>
                        <input type="date" id="nacimiento" name="nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                    </div>

                    <div id="grupo-celular" className="form-group">
                        <label id="label-celular" htmlFor="celular">Número de celular:</label>
                        <input type="tel" id="celular" name="celular" placeholder="Su número de celular" value={celular} onChange={(e) => setCelular(e.target.value)}required />
                    </div>

                    <div id="grupo-correo" className="form-group">
                        <label id="label-correo" htmlFor="correo">Correo electrónico:</label>
                        <input type="email" id="correo" name="correo" placeholder="Su correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>

                    <div id="grupo-pais" className="form-group">
                        <label id="label-pais" htmlFor="pais">País de domicilio:</label>
                        <select id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} required>
                        
                            <option value="1" disabled>Seleccione un país...</option>
                            <option value="169" selected>Colombia</option>
                            <option value="249">Estados Unidos</option>
                            <option value="245">España</option>
                        </select>
                    </div>

                    <div id="grupo-ciudad" className="form-group">
                        <label id="label-ciudad" htmlFor="ciudad">Ciudad de domicilio:</label>
                        <select id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required>
                        
                            <option value="1" disabled selected>Seleccione una ciudad...</option>
                            
                            <optgroup label="Colombia">
                                <option value="11001">Bogotá, D.C.</option>
                                <option value="05001">Medellín</option>
                                <option value="76001">Cali</option>
                                <option value="08001">Barranquilla</option>
                                <option value="13001">Cartagena</option>
                            </optgroup>
                            
                            <optgroup label="Estados Unidos">
                                <option value="US-NY">Nueva York</option>
                                <option value="US-MI">Miami</option>
                                <option value="US-LA">Los Ángeles</option>
                                <option value="US-CH">Chicago</option>
                                <option value="US-HO">Houston</option>
                            </optgroup>

                            <optgroup label="España">
                                <option value="ES-MA">Madrid</option>
                                <option value="ES-BA">Barcelona</option>
                                <option value="ES-VA">Valencia</option>
                                <option value="ES-SE">Sevilla</option>
                                <option value="ES-BI">Bilbao</option>
                            </optgroup>
                        </select>
                    </div>
            
                    <div id="grupo-tratamiento-datos" className="form-group">
                        <h4 id="titulo-tratamiento">Tratamiento de datos personales</h4>
                        <a id="enlace-terminos" href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981" target="_blank">Términos y condiciones</a>
                    
                        <div id="grupo-checkbox">
                            <input type="checkbox" id="tratamiento_datos" name="tratamiento_datos" checked={datosPersonales} onChange={(e) => setDatosPersonales(e.target.checked)} required/>
                            <label id="label-tratamiento" htmlFor="tratamiento_datos">Acepto </label>
                        </div>

                        <div id="grupo-boton-enviar" className="form-group">
                            <button type="submit" className="btn-submit">Enviar</button>
                         </div>
                    </div>     
                </form>
            </div>

            {entrenadores.length > 0 && (
                <div>
                    <h3>Cambiar Entrenador</h3>
                    <div>
                        {entrenadores.map((user) => (
                            <button key={user.id} type="button" onClick={() => seleccionarEntrenador(user)} 
                            style={{
                                backgroundColor: entrenadorActivo?.id === user.id ? "#f37dd9" : "#fffefe",
                                color: entrenadorActivo?.id === user.id ? 'white' : 'black',
                                padding: '6px 12px',
                            }}> {user.nombreCompleto}</button>
                        ))}
                    </div>

                </div>
            )
            };  
        </div>
        
    );

};