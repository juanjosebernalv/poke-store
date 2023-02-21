import './App.css';
import Card from './components/Card';
import { queryPokemon } from './utils/_api';
import { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await queryPokemon('pikachu');
      console.log(data);
      setPokemon(data);
    };
    loadPokemon();
  }, []);


  return (
    <div className="App">
      {pokemon && pokemon.sprites ?
        <section>
          <Card title="Component one" footer={<div>footer</div>}>
            <img src={pokemon.sprites['front_default']} alt='poketest' />
            <p>
              Hello Pikachu
            </p>
            <h2>Si</h2>
          </Card>
        </section>
        : <div>Loading...</div>
      }
    </div>
  );
}

export default App;
