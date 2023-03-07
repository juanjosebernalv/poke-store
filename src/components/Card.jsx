import React, { Children } from 'react';
import '../styles/components.css';

const Card = ({ title, src, footer }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <img src={src} />
      <p id="parrafo" className="titulo" style={{'color': 'yellow'}}>
        Info del pokemon
      </p>
      
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default Card;