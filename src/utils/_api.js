/*export const queryPokemon = (pokemonName,funSet) => 
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => funSet(data)); // o sea return data
;

 //OJO A ESTO
*/
export const queryPokemon = async (pokemonName,funSet) =>  {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  console.log('1. qué es response?',response);
  const data = await response.json();
  console.log('2. qué es data?',data);
  funSet(data);
  return data;

};

