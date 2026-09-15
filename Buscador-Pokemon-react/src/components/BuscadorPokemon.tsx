import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { usePokemon, type PokemonTerjeta } from "../context/PokemonContext";

export const BuscadorPokemon: React.FC = ( ) => {

    const {entrenadores, entrenadorActivo, registrarEntrenador, seleccionarEntrenador} = usePokemon();
    const navigate = useNavigate();

    
    const [id, setId] = useState(''),
    const [nombre, setNombre] = useState(''),
    const [image, setImage] = useState(''),
    const [type, setType] = useState(''),
    const [baseExperience, setBaseExperience] = useState(''),
    const [esFavorito, setEsFavorito] = useState(false),

    const eventoSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        const nuevo: PokemonTerjeta = {
            id: Number(id),
            nombre: nombre,
            image: image,
            type: type,
            baseExp: baseExperience,
            esfavorito: esFavorito



        };

        registrarEntrenador(nuevo);
        navigate('/pokemon');
    };

    return(
        <div>
            <header>
                <h2> Buscador Pokemon</h2>
            </header>
                <div>
                    <form onSubmit={eventoSubmit}>
                        <div>
                            <label> Inserte el nombre del Pokemon :D</label>
                            <input
                            type = "text"
                        
                            name="nombrePokemon"
                            placeholder="Ej. Pikachu, Charmander, Bulbasaur"
                            required
                            />
                        </div>

                        <div>
                            <button type="submit"> </button>
                        </div>

                           
                    </form>
                </div>

                 <div  className="card-pokemon">
                <h3></h3>
                <img/>

                <p>
                Tipo:
                <span className="badge-tipo"> 
                 </span>
                </p>

                <p>Exp Base: <strong></strong></p>
                <button className="btn-guardar" >
                Almacenar en Invertario
                </button>

            </div>

        </div>
        
    )

}