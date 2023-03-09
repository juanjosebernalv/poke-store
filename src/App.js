import './App.css';

import { queryListPokemon , queryPokemon} from './utils/_api.js';
import Card from './components/Card';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counter/counterSlice';


function App() {
  const [listaPokemon, setListaPokemon] = useState(undefined);
  const [listaPokemonDetalle, setListaPokemonDetalle] = useState(undefined);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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
        console.log(`3. CARGANDO Pokemon --->> ${nombre}`,data);
        return data;
    };

    const listaTmp = listaPokemon.results.map(async (pokeitem) => await loadPokemon(pokeitem.name));
    Promise.all(listaTmp).then((valores)=>{
      console.log("4. RESOLVIENDO promesas --> DETALLE : ",valores);
      setListaPokemonDetalle(valores);
    });
     
  }, [listaPokemon]);

  return (
    <div className="App">
      {listaPokemonDetalle?

        // <div>
        //   <button
        //     aria-label="Increment value"
        //     onClick={() => dispatch(increment())}
        //   >
        //     Increment
        //   </button>
        //   <span>{count}</span>
        //   <button
        //     aria-label="Decrement value"
        //     onClick={() => dispatch(decrement())}
        //   >
        //     Decrement
        //   </button>
        // </div>



      <section>
        {listaPokemonDetalle.map((pokeitem) => <Card pokeItem={pokeitem}></Card>)}
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
