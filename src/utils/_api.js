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