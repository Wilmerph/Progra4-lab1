import{
    createRootRoute,
    createRoute,
    createRouter,
    link,
    Outlet,
} from '@tanstack/react-router'

import SaludoWen from './Components/SaludoWen';
import BuscarPokemonWen from './Components/BuscarPokemonWen';
import Laboratorio1 from './Components/Laboratorio1';  
import './App.css'            


const rootRoute = createRootRoute({
    component: function RootLayout(){

        return (
            <> 
                <nav style= {{display: 'flex', gap: '1rem', padding: '1rem'}}>
                    <link to= "/" activeProps= {{style:{ fontWeight: 'bold'}}}>
                        Inicio
                    </link>
                    <link to= "/buscar-pokemon" activeProps= {{style:{ fontWeight: 'bold'}}}>
                        Buscar Pokemon
                    </link>
                    <link to= "/laboratorio1" activeProps= {{style:{ fontWeight: 'bold'}}}>
                        Laboratorio 1
                    </link>
                </nav>

                <section id= "center">
                    <Outlet />
                </section>  

            </>
        )
    },
})

