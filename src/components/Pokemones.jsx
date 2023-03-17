import React, {children} from 'react';
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setTotalResults } from '../counter/counterSlice';

import { queryListPokemon , queryPokemon, queryPokemonSpecies,queryPokemonColors,queryPokeURL} from '../utils/_api';
import Card from './Card';
import Navbar from './Navbar';

const Pokemones = () => {
    const [listaPokemon, setListaPokemon] = useState(undefined);
    const [listaPokemonDetalle, setListaPokemonDetalle] = useState(undefined);
    const [listaPokemonColor, setListaPokemonColor] = useState(undefined);
    
  
    //-- a ver si entiendo, los SELECTORES son para sacar los valores del store.
    //-- state.counter.. ese counter es el "name" del counterSlice?
    //-- no entiendo porqué desestructura al initialState de counterSlice

    const {pageSize,currentPage,totalPages,totalResults:totalPokes} = useSelector((state) => state.counter);
  
  
    //-- el dispatch para que.. una accion sea enviada al REDUCER que es quien 
    //-- actualiza valores en el store.
    const dispatch = useDispatch();

    useEffect(()=>{
      console.log("-----------------1-----------");
        const loadListaColoresPokemon = async () => {

            const data = await queryPokemonColors();
            // console.log('=====  COLORES POKEMON: ',data);
            const listaTmp = data.results.map(async({name,url})=>{
              // console.log(`COLOR name ${name} y url ${url}`);
              return await queryPokeURL(url);
            });
            const colorsAndPokemons = await Promise.all(listaTmp).then((valores)=>{
              //console.log("URL DE COLORES --> : ",valores);
              return valores;
              //setListaPokemonDetalle(valores);
            });
            // console.log("colorsAndPokemons -------------->>", colorsAndPokemons);
            // -- ESTA LISTA LA VOY A TRANSFORMAR Y SE VA A IR AL STORE.. o no? como q no es necesario. jajajajaja
            const pokemonsWithColors = colorsAndPokemons.flatMap(({ name, pokemon_species }) => {
              return pokemon_species.map(pokemon => ({ name: pokemon.name, color: name }));
            });
            
            // console.log("pokemonsWithColors ............................",pokemonsWithColors);
            setListaPokemonColor(pokemonsWithColors);
          };
          loadListaColoresPokemon(); 

    },[]);
  
    useEffect(() => {
      console.log("2-----------");

       const loadListaPokemon = async () => {
         //console.log("currentPage---->> ", currentPage);
         const data = await queryListPokemon(currentPage);
         //console.log('1. primer useEffect --> listaPokemon: ',data);
         setListaPokemon(data);
         //console.log("1. desde primer useEffect, totalPokes json:",data.count);
         dispatch(setTotalResults(data.count));
         //console.log("1. desde primer useEffect, totalPokes store:",totalPokes);
       };
      loadListaPokemon(); 
      //-- a ver.. 
      
      
    }, [currentPage,dispatch]);
  
    useEffect( () => {
      console.log("3-----------");
      // -- segun entiendo, sólo corre cuando la "dependencia" esté lista
      //console.log("!(listaPokemon && listaPokemonColor)",!(listaPokemon && listaPokemonColor));
      //console.log(listaPokemon,listaPokemonColor);
      if(!(listaPokemon && listaPokemonColor))return;
  
      //console.log("2. segundo useEffect --> listaPokemon: ",listaPokemon);
      const loadPokemon = async (nombre) => {
          const data = await queryPokemon(nombre);
          //console.log(`3. CARGANDO Pokemon --->> ${nombre}`,data);
          data.color = "white";
          return data;
      };

      const listaTmp = listaPokemon.results.map(async (pokeitem) => await loadPokemon(pokeitem.name));

      if(!listaPokemonColor){
        //console.log("SE SUPONE Q LA LISTA DE COLORES CARGA PRIMERO ENTONCES PORQUE ESTA VACIA AQUI ",listaPokemonColor);  
        return
      };
      console.log("listaPokemonColor --> ",listaPokemonColor);

      Promise.all(listaTmp).then((valores)=>{
        //-- añadiendo colores
        valores.map((pokeDet)=>{
          pokeDet.color='yellow';

          //caracter informativo, los pokes q no se llaman igual a su "species"
          if(pokeDet.name !==pokeDet.species)console.log(`detalles del poke url...${pokeDet.name} `,pokeDet.species);
          
          //OJO en algunos casos el nombre del pokemon no es exactamente igual a como aparece en su "species"
          // y la lista de colores se hace con los nombres de pokemon de la lista de "species"
          //por otro lado.. la lista de pokes en colores es MENOR que la oficial de pokemones, por PREFIJOs
          let objetoEncontrado = listaPokemonColor.find(objeto => pokeDet.name.includes(objeto.name));//objeto.name === pokeDet.name
          console.log(`ACA VA VIVO poke ${pokeDet.name}`,objetoEncontrado);
          pokeDet.color=objetoEncontrado?objetoEncontrado.color:'white';
        });
        //console.log("4. RESOLVIENDO promesas -->  DETALLEs : ",valores);

        setListaPokemonDetalle(valores);
      });
       
    }, [listaPokemon,listaPokemonColor]);

    useEffect( () => {
      console.log("4-----------");
        // -- para consultar las Especies que son menos que los pokemones
        // -- segun entiendo, sólo corre cuando la "dependencia" esté lista
        if(!listaPokemonDetalle)return;
    

        let urlSpecies=listaPokemonDetalle.map((poke) =>poke.species.url);
        //console.log(`urlSpecies (${urlSpecies.length})--->`,urlSpecies);    
        urlSpecies = [...new Set(urlSpecies)];    
        //console.log(`urlSpecies (${urlSpecies.length})--->`,urlSpecies);  
        // const especies = listaPokemonDetalle



    // --- NO TENGO Q CONSULTAR ESTOOOOOOOOOOOO
         const listaTmp = listaPokemonDetalle.map(async (pokeitem) => await queryPokemonSpecies(pokeitem.species.url));
         Promise.all(listaTmp).then((valores)=>{
           //console.log("ESPECIE --> : ",valores);
           //setListaPokemonEspecies(valores);
         });
         
      }, [listaPokemonDetalle]);
  
    return (
      <div className="App">
        {listaPokemonDetalle?
        <>
          <div>
            <Navbar/>
          </div>
  
        <hr className='slice'/>
  
        <section>
          {/* {console.log('------listaPokemonDetalle', listaPokemonDetalle)} */}
          {listaPokemonDetalle.map((pokeitem) => <Card key={pokeitem.name} pokeItem={pokeitem}>{pokeitem.name}</Card>)}
        </section>
        
        </>   
        : 
          <footer className="App-header">
          <p>
            CARGANDO <code>lista</code> DE POKEMONES
          </p>
        </footer>
        }
  
      </div>
    );
};

export default Pokemones;