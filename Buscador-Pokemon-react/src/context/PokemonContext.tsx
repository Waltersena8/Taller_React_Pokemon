import  React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';


export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: {
        tipo: string, numero: string
    };
    fechaNacimiento: string;
    correo: string;
    datosPersonales: boolean;
    fehcaRegistro: string;

};

export interface PokemonTerjeta  {
    id: number;
    nombre: string;
    image: string;
    type: string;
    baseExperience: string;
    esFavorito?: boolean;
}

interface PokemonContextType {
    entrenadores: Usuario[];
    entrenadorActivo: Usuario | null;
    mochillaActual: PokemonTerjeta[];
    seleccionarEntrenador: (usuario: Usuario) => void;
    registrarEntrenador: (usuario: Usuario) => void;
    guardarMochila: (pokemon: PokemonTerjeta) => void;
    actualizarFavorito: (pokemonId: number) => void;
    eliminarPokemon: (pokemonId: number) => void;

}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);
export const PokemonProvider : React.FC<{ children: ReactNode }> = ({children}) => {
    const [entrenadores,setEntrenadores] = useState<Usuario[]>([]);
    const [entrenadoresActivo,setEntrenadorActivo] = useState<Usuario[] | null> ( null );
    const [mochillaActual,setMochilaActual] = useState<PokemonTerjeta[] | null> ( null );

    useEffect(() =>{
        const data = localStorage.getItem('LISTA_ENTRENADORES');
        if(data) {
            const lista: Usuario[]= JSON.parse(data);
            setEntrenadores(lista);

            const idActivo = localStorage.getItem('ENTRENADOR_ACTIVO_ID');
            if(idActivo){
                const encontrado = lista.find(u => u.id.toString() === idActivo);
                if (encontrado) seleccionarEntrenador(encontrado);       
            }
        }

    }, [] );
    
    const cargarMochilaEntrenador = (usuarioId: number ) => {
        const data = localStorage.getItem(`mochila_${usuarioId}`);
        setMochilaActual(data ? JSON.parse(data) : []);
    }

    const seleccionarEntrenador = (usuario: Usuario) => {
        setEntrenadorActivo(usuario);

        localStorage.setItem('entrenador_activo_id', usuario.id.toString());
        cargarMochilaEntrenador(usuario.id);
    }
}


