import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import { queryPokemon } from './utils/_api';
import { useState, useEffect } from 'react';

function App() {
  /* a ver, useState es como si creara un atributo y su función set.
   como esto es una función y no una clase, así toca
   el setAtributo actualiza de paso al componente*/
  const [pokemon, setPokemon] = useState({});


  /*useEffect: realizar efectos secundarios en componentes de función.
  Los efectos secundarios son cualquier cosa que no tenga que ver con
  la representación de la interfaz de usuario, 
  como la carga de datos desde una API, la suscripción a eventos 
  o la manipulación del DOM.
  --->> Se ejecuta después de que se renderice el componente (se monte en el DOM)
   y cada vez que se actualice el componente. 
  */
  useEffect(() => {
    /*--->> INGREDIENTES
    Como parámetro entra UNA FUNCION FLECHA llamada función de efecto
    se ejecuta después de cada renderizado
    */
     const loadPokemon = async () => {
         //-- async marca la fun flecha como ASINCRONA , lo que significa que
         //-- devuelve una promesa y no un valor.
       const data = await queryPokemon('pikachu');
         //-- await detiene la ejecución de la función hasta que se resuelva una promesa.
       console.log('b. loadPokemon',data);
       setPokemon(data);
     };
    loadPokemon(); //================================

/* return () => {};  función de limpieza opcional despues de cada render
   se ejecuta antes de que se vuelva a ejecutar el efecto o justo antes de que se 
   desmonte el componente.
   Esto se utiliza comúnmente para cancelar suscripciones a eventos 
   o para cancelar solicitudes asíncronas pendientes.
*/

    const consultarPicachu =  () => {
      const data =  queryPokemon('pikachu',setPokemon);
      console.log('3. consultarPicachu retornando data',data);
      //A VER. then() resuelve promesas, lo mismo que AWAIT
      //    solo que then concatena y pasa por parámetro el resultado y vueeelve y llama algo que
      //    devuelve una promesa..
      /*una promesa en JavaScript es un "objeto" que representa un valor que puede estar 
      disponible ahora, en el futuro o nunca. Se utiliza para manejar operaciones asíncronas
       y se puede encadenar con las funciones then() y catch() para procesar el resultado
        de la operación asíncrona.
      */
      //setPokemon(data);

      // fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      //   .then((response) => response.json())
      //   .then((data) => setPokemon(data));
    };
    //consultarPicachu();//================================
  }, []); /* Y UNA MATRIZ DE DEPENDENCIAAAS
     matriz opcional que contiene las dependencias para el efecto. 
     Si se proporciona una matriz vacía, el efecto se ejecutará solo una vez 
     después del montaje del componente.
     */
  return (
    <div className="App">
     {pokemon && pokemon.sprites ?
      <section>
        <Card title={pokemon.name} footer={<div><hr/>footerrr</div>}>
           <img src={pokemon.sprites['front_default']} title={pokemon.name} /> 
          <p>
            Hello {pokemon.name}
          </p>
          <h2>Si</h2>

          <div className="container">
            <h2 style={{'backgroundColor':'black'}}>dd</h2>
            <p>ddd</p>
          </div>
        </Card>
      </section>: <div>Loading...</div>
      }
    </div>
  );
}

export default App;
