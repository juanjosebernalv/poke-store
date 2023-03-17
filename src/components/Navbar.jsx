import react from 'react'

import { useSelector, useDispatch } from 'react-redux';
import {decrement, increment } from '../counter/counterSlice';



const Navbar = () => {

    const {pageSize,currentPage,totalPages,totalResults:totalPokes} = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <nav>
            <div>
            <p>{`pag actual ${currentPage+1}, totalPaginas ${totalPages}, total Pokemones ${totalPokes}`}</p>
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
        </nav>
    )
};

export default Navbar;