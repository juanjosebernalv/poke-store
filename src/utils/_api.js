export const queryListPokemon = (offset=0,limit=20) => 
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset*limit}`)
    .then((response) => response.json())
    .then((data) => (data));
;

export const queryPokemon = (pokemonName) => 
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => (data));
;

export const queryPokemonSpecies = (url) => 
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => (data));
;

export const queryPokemonColors = () => 
  fetch(`https://pokeapi.co/api/v2/pokemon-color`)
    .then((response) => response.json())
    .then((data) =>(data));
;

// -- generica
export const queryPokeURL = (url) => 
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => (data));
;

// La idea era evitar consultar la url.. tons hacer al revés
// sólo consultar los COLORES que ya traen la URL y armar la lista al reves
// y consulto a la inversa, con el key de la url del pokemon, consulto el color en la lista.

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     return fetch('https://jsonplaceholder.typicode.com/todos/2');
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


