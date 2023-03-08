export const queryListPokemon = () => 
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)
    .then((response) => response.json())
    .then((data) => (data));
;

export const queryPokemon = (pokemonName) => 
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => (data));
;