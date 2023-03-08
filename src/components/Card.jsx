import React, { Children } from 'react';
import { useState, useEffect } from 'react';

import { queryPokemon } from '../utils/_api.js';
import '../styles/components.css';

const Card = ({ nombre, children }) => {
    const [pokemon, setPokemon] = useState({});
    const [divStyle, setDivStyle] = useState({});
    useEffect(() => {
        /*--->> INGREDIENTES
        Como parámetro entra UNA FUNCION FLECHA llamada función de efecto
        se ejecuta después de cada renderizado
        */
         const loadPokemon = async () => {
             //-- async marca la fun flecha como ASINCRONA , lo que significa que
             //-- devuelve una promesa y no un valor.
           const data = await queryPokemon(nombre);
             //-- await detiene la ejecución de la función hasta que se resuelva una promesa.
           console.log(`Pokemon ${nombre}`,data);
           setPokemon(data);
           //setDivStyle({'background-color': 'blue'});
           setDivStyle({'background-image': `url(\"${data.sprites.other['official-artwork'].front_default}\")`});
           ;
         };
        loadPokemon(); //================================
      }, []);

  return (
    <div className="card">
    { pokemon && pokemon.abilities && pokemon.sprites && pokemon.sprites.other?
      <>
          <div className="flotante, fondoFlotante" style={divStyle}></div>
          <div className="flotante">
              <h1 className="titulo">{pokemon.name}</h1>
              <img src={pokemon.sprites['front_default']} title={pokemon.name} /> 
              <p>Habilidades:</p>
              <ul>{
              pokemon.abilities.map(habil => <li>{habil.ability.name}</li>)
                }
              </ul> 
              {children}
              <footer>
                {'aqui footer datos'}
              </footer>
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