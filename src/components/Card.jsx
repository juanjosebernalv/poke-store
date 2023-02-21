import React, { Children } from 'react';
import '../styles/components.css';

const Card = ({ title, children, footer }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <h1 id="parrafo" className="titulo" style={{'color': 'yellow'}}>parrafo</h1>
      {children}
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default Card;