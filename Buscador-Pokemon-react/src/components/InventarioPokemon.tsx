import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { usePokemon } from "../context/PokemonContext";

export const inventarioPokemon: React.FC = ( ) => {

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
    const [ datosPersonales, setDatosPersonales] = useState('false');

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
            celu: celular,
            correo,
            recidencia: { pais: pais, ciudad: ciudad},
            check: datosPersonales,
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
                 <h2>El maleto de los Pokemones</h2>
                <p>Total en almacen: <strong></strong></p>
            </div>

            <div className="grid-pokemons">
                <div>
                    <span className="posicion-badge"> </span>
                    <img/>
                    <h4></h4>
                    <p></p>

                    <div className="acciones">
                        <button> </button>
                        <button className="btn-eliminar" >
                            Matar
                        </button>
                    </div>
                </div>
        
                    <div className="sin-datos">
                        <p> No tienes ningun Pokemon Capturado</p>
                        <p> Registra un nuevo Pokemon </p>
                    </div>
                

            </div>
        </div>
        
    )

}