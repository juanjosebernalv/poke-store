import './App.css';

import { queryListPokemon } from './utils/_api.js';
import Card from './components/Card';
import { useState, useEffect } from 'react';


function App() {
  const [listaPokemon, setListaPokemon] = useState({});

  useEffect(() => {
    /*--->> INGREDIENTES
    Como parámetro entra UNA FUNCION FLECHA llamada función de efecto
    se ejecuta después de cada renderizado
    */
     const loadListaPokemon = async () => {
         //-- async marca la fun flecha como ASINCRONA , lo que significa que
         //-- devuelve una promesa y no un valor.
       const data = await queryListPokemon();
         //-- await detiene la ejecución de la función hasta que se resuelva una promesa.
       console.log('Lista Pokemon RESULtS',data.results);
       data && data.results && setListaPokemon(data);
     };
    loadListaPokemon(); //================================
  }, []);

  return (
    <div className="App">
      {listaPokemon && listaPokemon.results?
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
