import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../../public/Images/Logonetflix.png';

const AppFooter = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                <div className="col-md-4 d-flex align-items-center">
                <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <img src={logo} width='80'/>
                </Link>
                <span className="mb-3 mb-md-0 text-muted">© 2023 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <Link className="text-muted" to="https://www.facebook.com/Netflixmx">
                            <i className='bi bi-facebook'/>
                        </Link>
                    </li>
                    <li className="ms-3">
                        <Link className="text-muted" to="https://www.instagram.com/netflix/">
                            <i className='bi bi-instagram'/>
                        </Link>
                    </li>
                    <li className="ms-3">
                        <Link className="text-muted" to="https://twitter.com/netflixLAT">
                            <i className='bi bi-twitter'/>
                        </Link>
                    </li>
                    <li className="ms-3">
                        <Link className="text-muted" to="https://www.youtube.com/channel/UC5ZiUaIJ2b5dYBYGf5iEUrA">
                            <i className='bi bi-youtube'/>
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default AppFooter
