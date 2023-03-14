import react from 'react'

import { useSelector } from 'react-redux';




const Navbar = () => {

    const {pageSize,currentPage,totalPages,totalResults:totalPokes} = useSelector((state) => state.counter);
  

    return (
        <nav>
            <div><p>barra de navegacion paginación</p>
            <a href="">{`pag actual ${currentPage+1}, totalPaginas ${totalPages}, total Pokemones ${totalPokes}`}</a>

            </div>
        </nav>
    )
};

export default Navbar;