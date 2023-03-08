import React from 'react';
import '../styles/components.css';

import { useSelector } from 'react-redux';

const Card = ({ title, src, footer }) => {
  const count = useSelector((state) => state.counter.other);
  return (
    <div className="card">
      <h1>{title}</h1>
      <img src={src} alt={title} />
      <p id="parrafo" className="titulo" style={{ 'color': 'yellow' }}>
        Info del pokemon
      </p>
      <pre>
        count {count}
      </pre>
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default Card;