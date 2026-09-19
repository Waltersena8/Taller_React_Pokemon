import React from "react";
import { usePokemon, type PokemonTerjeta } from "../context/PokemonContext";

export const InventarioAvtivo: React.FC = ( ) => {

    const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochillaActual} = usePokemon();

            


        if(!entrenadorActivo){
            return(
            <div>
                <h3> NO HAY ENTRENADORES</h3>
                <p> PORFAVIR ASIGNE ENTRENADOR ACTIVO O REGISTRE UN ENTRENADOR, <strong>BOBO TRIPLE HIJUEPUTA SETENTA HIJUEPUTA</strong></p>
            </div>)
        }
    


    return(

    <div className=".banner-section">
        <header>
            <h2>Mochilla de {entrenadorActivo.nombreCompleto}</h2>
        </header>

        <div className='grid-mochila'>
            {
                mochillaActual.length > 0 ? (mochillaActual.map( (poke, index ) => (
                    <div key ={poke.id} className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' : ''}`}>
                        <span>
                            #{index+1} de {mochillaActual.length}
                        </span>

                        <img src={poke.image} />
                        <h4>{poke.name}</h4>
                        <p> {poke.type}</p>

                        <div className="panel-botones">
                            <button className={`btn-fav ${poke.esFavorito ? 'fav-activo' : ''}`} onClick={() => actualizarFavorito(poke.id)}>
                                    {poke.esFavorito ? '⭐Favorito' : '🌚No Favorito'}
                            </button>

                            <button type='button'  className="btn-eliminar" onClick={() => eliminarPokemon(poke.id)}>
                                     Matar 
                            </button>
                        </div>
                    </div>
                )
             )) : (
                <div className=".mochila-vacia">
                    <p>Tu mochila esta vacia actualmente</p>
                    <p>Vaya y captyre pokemones </p>
                </div>
             )
            }
        </div>

    </div>
        
    )

}