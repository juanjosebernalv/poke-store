import React, { Children } from 'react';
import { useState, useEffect } from 'react';
import '../styles/components.css';

import { useSelector } from 'react-redux';


const Card = ({ pokeItem, children }) => {
    const [pokemon, setPokemon] = useState(undefined);
    const [divStyle, setDivStyle] = useState({});

    const totalPokes = useSelector((state) => state.counter.totalResults);

    useEffect(() => {

      if(!pokeItem)return;

      setPokemon(pokeItem);
      setDivStyle({'background-image': `url(\"${pokeItem.sprites.other['official-artwork'].front_default}\")`});



      // 'background-image': 'linear-gradient(to bottom, yellow, #0000ff)'
      //  {'background-image': `linear-gradient(to bottom, ${pokemon.color?pokemon.color:'yellow'}, white)`}

    }, []);


  return (
    <div className="card" style={{'background-image': `linear-gradient(to bottom, ${pokemon?pokemon.color:'yellow'}, white)`}}>
    { pokemon ?
      <>
          <div className="flotante, fondoFlotante" style={divStyle}></div>
          <div className="flotante">
              <h1 className="titulo">{pokemon.name}-{pokemon.color}</h1>
              <img src={pokemon.sprites['front_default']} title={pokemon.name} /> 
              <p>Habilidades:</p>
              <ul>{
                 pokemon.abilities.map(habil => <li>{habil.ability.name}</li>)
                }
              </ul> 
              {children}
              {/* <footer>
                {'aqui footer datos'}
                <pre>
                total Pokes {totalPokes}
                </pre>
              </footer> */}
          </div>
      </>:
        <footer>
        <p>
          CARGANDO <code>POKEMON</code>
        </p>
      </footer>
      }
    </div>
  );
};

export default Card;
