import './App.css';
import Card from './components/Card';
import { queryAllPokemon, queryPokemon } from './utils/_api';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counter/counterSlice';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetailList, setPokemonDetailList] = useState([]);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPokemon = async () => {
      const list = await queryAllPokemon();
      //console.log(list);
      list && list.results && setPokemonList(list.results);
    };
    loadPokemon();
  }, []);

  useEffect(() => {

    const detailPokemon = async () => {
      console.log('start');
      const promises = pokemonList.map(
        async poke => {
          console.log('poke: ' + poke.name);
          const pokemon = await queryPokemon(poke.name);
          return pokemon;
        }
      );
      const allPokemons = await Promise.all(promises);
      //console.log ("allPokemons "+JSON.stringify(allPokemons));
      allPokemons && setPokemonDetailList(allPokemons);
      console.log("allPokemons " + JSON.stringify(allPokemons));
    };
    detailPokemon();
  }, [pokemonList]);

  return (
    <div className="App">
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      <h1>Pokemon List</h1>
      <section>
        {pokemonDetailList.map((pokemon) => (
          <Card id={pokemon.id} title={pokemon.name} src={pokemon.sprites.other.dream_world['front_default']} footer={<div>footer</div>} />
        ))

        }
      </section>
    </div>
  );
}

export default App;
