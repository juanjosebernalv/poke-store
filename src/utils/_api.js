export const queryPokemon = (pokemonName) => 
   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => (data));
;