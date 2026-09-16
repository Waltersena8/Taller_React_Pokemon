import React, { useState } from "react";
import { usePokemon, type PokemonTerjeta } from "../context/PokemonContext";

export const BuscadorPokemon: React.FC = ( ) => {

    const { entrenadorActivo, guardarPokemonMochila} = usePokemon();


    
    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTerjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();

        const query = busqueda.trim().toLocaleLowerCase();

        if(!query) return;


        setCargando(true);
        setMensajeError(null);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if(!res.ok) throw new Error('Callate sapo')

            const datos = await res.json();
            setPokemonActual({
                id: datos.id,
                nombre: datos.nombre.toUpperCase(),
                image: datos.sprites.front_default,
                type: datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito: false
            });
        } catch (error: any) {
                setPokemonActual(null);
                setMensajeError(error.message);
        } finally {
            setCargando(false);
        }
    
    };

    if (pokemonActual) {
        guardarPokemonMochila(pokemonActual);
        alert(`El pokemon ${pokemonActual} es guardado en la mochila de ${entrenadorActivo?.nombreCompleto} el cartero`)
    }

    return(
        <><div>
            {entrenadorActivo ? (<p>Mochilla Activa: <strong>{entrenadorActivo.nombreCompleto}</strong></p>
            ) : (<p>No hay entrenador Activo marica, valla a RegistroUsuario y creelo maricon</p>)}
        </div><form onSubmit={BuscadorPokemon}>
                <div>
                    <label htmlFor="">Buscar Pokemon</label>
                    <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ej: maricon" />
                </div>

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Escaneando...' : 'Buscar'}
                </button>
            </form>
                {pokemonActual &&(
            <div>
                <h4>{pokemonActual?.nombre}</h4>
                <img src="{pokemonActual.image}" />
            </div>)}
        

        
            </>
            
        
    )

}