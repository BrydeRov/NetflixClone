import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/Images/Logonetflix.png';

// Chakra UI
import { Input } from '@chakra-ui/react';

const AppTopBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand mx-4" to="/">
                        <img src={logo} width='80'/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Home">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/TV">Series</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Películas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Novedades Populares</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Mi lista</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <Input placeholder='Buscar . . .' />
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AppTopBar
