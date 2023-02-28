import logo from './logo.svg';
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
    // const consultarPicachu = () => {
    //   fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    //     .then((response) => response.json())
    //     .then((data) => setPokemon(data));
    // };
    // consultarPicachu();
  }, []);


  return (
    <div className="App">
      {/*
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
      
      */}
      <section>
        <Card title={pokemon.name} footer={<div>footer</div>}>
           <img src={pokemon.sprites['front_default']} alt='poketest' /> 
          <p>
            Hello {pokemon.name}
          </p>
          <h2>Si</h2>

          <div className="container">
            <h2 style={{'backgroundColor':'black'}}>dd</h2>
            <p>ddd</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default App;
