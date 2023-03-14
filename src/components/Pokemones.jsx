import React, {children} from 'react';
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setTotalResults, decrement, increment } from '../counter/counterSlice';

import { queryListPokemon , queryPokemon} from '../utils/_api';
import Card from './Card';
import Navbar from './Navbar';

const Pokemones = () => {
    const [listaPokemon, setListaPokemon] = useState(undefined);
    const [listaPokemonDetalle, setListaPokemonDetalle] = useState(undefined);
    
  
    //-- a ver si entiendo, los SELECTORES son para sacar los valores del store.
    //-- state.counter.. ese counter es el "name" del counterSlice?
    //-- no entiendo porqué desestructura al initialState de counterSlice

    const {pageSize,currentPage,totalPages,totalResults:totalPokes} = useSelector((state) => state.counter);
  
  
    //-- el dispatch para que.. una accion sea enviada al REDUCER que es quien 
    //-- actualiza valores en el store.
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log("---------------------------------------");
       const loadListaPokemon = async () => {
         console.log("currentPage---->> ", currentPage);
         const data = await queryListPokemon(currentPage);
         console.log('1. primer useEffect --> listaPokemon: ',data);
         setListaPokemon(data);
         console.log("1. desde primer useEffect, totalPokes json:",data.count);
         dispatch(setTotalResults(data.count));
         console.log("1. desde primer useEffect, totalPokes store:",totalPokes);
       };
      loadListaPokemon(); 
      //-- a ver.. 
      
      
    }, [currentPage,dispatch]);
  
    useEffect( () => {
      // -- segun entiendo, sólo corre cuando la "dependencia" esté lista
      if(!listaPokemon)return;
  
      //console.log("2. segundo useEffect --> listaPokemon: ",listaPokemon);
      const loadPokemon = async (nombre) => {
          const data = await queryPokemon(nombre);
          //console.log(`3. CARGANDO Pokemon --->> ${nombre}`,data);
          return data;
      };
  
      const listaTmp = listaPokemon.results.map(async (pokeitem) => await loadPokemon(pokeitem.name));
      Promise.all(listaTmp).then((valores)=>{
        console.log("4. RESOLVIENDO promesas --> DETALLE : ",valores);
        setListaPokemonDetalle(valores);
      });
       
    }, [listaPokemon]);
  
    return (
      <div className="App">
        {listaPokemonDetalle?
        <>
          <div>
            <Navbar/>
          <button aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <span> {currentPage+1} </span>
            <button aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
          </div>
  
        <hr className='slice'/>
  
        <section>
          {console.log('------listaPokemonDetalle', listaPokemonDetalle)}
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