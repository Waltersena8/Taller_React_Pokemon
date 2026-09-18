import  React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';


export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: {
        tipo: string, numero: string
    };
    celular: string;
    recidencia: {pais: string, ciudad: string}
    fechaNacimiento: string;
    correo: string;
    datosPersonales: boolean;
    fehcaRegistro: string;
    
};

export interface PokemonTerjeta  {
    id: number;
    name: string;
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
    guardarPokemonMochila: (pokemon: PokemonTerjeta) => void;
    actualizarFavorito: (pokemonId: number) => void;
    eliminarPokemon: (pokemonId: number) => void;


}

const PokemonContext = createContext<PokemonContextType | undefined> (undefined);
export const PokemonProvider : React.FC<{ children: ReactNode }> = ({children}) => {
    const [entrenadores,setEntrenadores] = useState<Usuario[]>([]);
    const [entrenadorActivo,setEntrenadorActivo] = useState<Usuario| null> ( null );
    const [mochillaActual,setMochilaActual] = useState<PokemonTerjeta[]> ([]);

    useEffect(() =>{
        const data = localStorage.getItem('LISTA_ENTRENADORES');
        if(data) {
            const lista: Usuario[]= JSON.parse(data);
            setEntrenadores(lista);

            const idActivo = localStorage.getItem('entrenador_activo_id');
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

    const registrarEntrenador = (nuevoUsuario: Usuario) => {
        const actualizados = [...entrenadores, nuevoUsuario];
        setEntrenadores(actualizados);
        localStorage.setItem('LISTA_ENTRENADORES', JSON.stringify(actualizados));
        seleccionarEntrenador(nuevoUsuario);
    }

    const guardarPokemonMochila = (pokemon: PokemonTerjeta) => {
        if (!entrenadorActivo) return;

    const storagellave = `mochilla_${entrenadorActivo.id}`;
    const mochilaGuardada = localStorage.getItem(storagellave);
    if (!mochilaGuardada) {
        const validacion = [{ ...pokemon, esFavorito: false }];
        setMochilaActual(validacion);
        localStorage.setItem(storagellave, JSON.stringify(validacion));
        
        return; 
    }
    const actualizada = [ ...mochillaActual, { ...pokemon, esFavorito: false } ];
    setMochilaActual(actualizada);
    localStorage.setItem(storagellave, JSON.stringify(actualizada));

       

    }

   
    const actualizarFavorito = (pokemonId: number) => {
        if(!entrenadorActivo) return;
        const actualizada = mochillaActual.map(p => p.id === pokemonId ? {...p, esFavorito: !p.esFavorito} : p);
        setMochilaActual(actualizada);
        localStorage.setItem(`mochilla_${entrenadorActivo.id}`, JSON.stringify(actualizada))
        
    }

    const eliminarPokemon = (pokemonId: number) => {
        if(!entrenadorActivo) return;
        const filtrado = mochillaActual.filter(p => p.id !== pokemonId );
        setMochilaActual(filtrado);
        localStorage.setItem(`mochilla_${entrenadorActivo.id}`, JSON.stringify(filtrado))
    };

    return (
        <PokemonContext.Provider value={{
            entrenadores,
            mochillaActual,
            entrenadorActivo, 
            seleccionarEntrenador, 
            registrarEntrenador, 
            guardarPokemonMochila, 
            actualizarFavorito, 
            eliminarPokemon 
                
           
        }} >{children}
        </PokemonContext.Provider>
           
      
             
            
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if(!context) {throw new Error('usePokemon debe usarse en un Provider Imbecil')
    }
    return context;
}


