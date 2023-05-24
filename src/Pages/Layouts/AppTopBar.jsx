import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/Images/Logonetflix.png';

const AppTopBar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
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
                                <Link className="nav-link text-white active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/TV">Series</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Movies">Películas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" href="#">Novedades Populares</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/MiLista">Mi lista</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            {props.inputSearch}
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AppTopBar
