import React, { Children } from 'react';
import '../styles/components.css';

const Card = ({ title, children, footer }) => {
  return (
    <div className="card">
      <h1 className="titulo">{title}</h1>
      {children}
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default Card;