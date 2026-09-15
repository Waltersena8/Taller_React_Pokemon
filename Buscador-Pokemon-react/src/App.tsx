import {BrowserRouter, Routes, Route, NavLink, Navigate} from 'react-router-dom'
import { PokemonProvider } from './context/PokemonContext';
import { RegistroUsuario } from './components/RegistroUsuarios'
 
function App(){
  return(
    <PokemonProvider>
      <BrowserRouter>
        <header>
          <h1>Registro de Entrenadores y Pokeon en React</h1>
        <nav>

          <NavLink to="/registro" className={({isActive}) => (isActive? 'active-tab' : '')}>  REGISTRO</NavLink>
          <NavLink to="/buscador" className={({isActive}) => (isActive? 'active-tab' : '')}>  BUSCADRO</NavLink>
          <NavLink to="/inventario" className={({isActive}) => (isActive? 'active-tab' : '')}>  REGISTRO</NavLink>


        </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Navigate to ="registro" replace/>}></Route>
            <Route path='/registro' element={<RegistroUsuario/>}></Route>
            <Route path='/buscador' ></Route>
            <Route path='/inventario' ></Route>
          </Routes>
        </main>
       
      </BrowserRouter>
    </PokemonProvider>

  )
}