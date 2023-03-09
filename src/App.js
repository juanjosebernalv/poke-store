import './App.css';

import { queryListPokemon , queryPokemon} from './utils/_api.js';
import Card from './components/Card';
import { useState, useEffect } from 'react';


function App() {
  const [listaPokemon, setListaPokemon] = useState(undefined);
  const [listaPokemonDetalle, setListaPokemonDetalle] = useState(undefined);

  useEffect(() => {
     const loadListaPokemon = async () => {
       const data = await queryListPokemon();
       console.log('1. primer useEffect --> listaPokemon: ',data);
       setListaPokemon(data);
     };
    loadListaPokemon(); 
  }, []);

  useEffect( () => {
    // -- segun entiendo, sólo corre cuando la "dependencia" esté lista
    if(!listaPokemon)return;

    console.log("2. segundo useEffect --> listaPokemon: ",listaPokemon);

    const loadPokemon = async (nombre) => {
        const data = await queryPokemon(nombre);
        console.log(`3. CARGANDO --- Pokemon ${nombre}`,data);
        return data;
    };

    //console.log("3.");
    (async () => {
      const listaTmp =  listaPokemon.results.map(async (pokeitem) =>{await loadPokemon(pokeitem.name);});
      await Promise.all(listaTmp);
      console.log("4. segundo useEffect --> DETALLE : ",listaTmp);
      setListaPokemonDetalle(listaTmp);
    })();
    
    

     
  }, [listaPokemon]);

  return (
    <div className="App">
      {listaPokemon?
      <section>
        {listaPokemon.results.map((pokeitem) => <Card nombre={pokeitem.name}></Card>)}
      </section>: 
        <footer className="App-header">
        <p>
          CARGANDO <code>lista</code> DE POKEMONES
        </p>
      </footer>
      }

    </div>
  );
}

export default App;
