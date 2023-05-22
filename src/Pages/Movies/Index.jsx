// Other
import axios from 'axios';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Chakra UI
import { IconButton, Tooltip } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

// Components
import AppLayout from '../Layouts/AppLayout';
import MovieCard from '../../Components/MovieCard';
import ShowMovie from '../../Components/ShowMovie';

const API_KEY = process.env.REACT_APP_API_KEY

const Index = () => {
    const [dataMovies, setDataMovies] = useState([])
    const [movieShow, setMovieShow] = useState(null)

    const fetchDataMovies = async () =>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}`)
        setDataMovies(data)
    } 
    
    useEffect(() => {
        fetchDataMovies()
    }, []);

    const showMovie = (data) => {
        setMovieShow(data);
    }

    
    return (
        <AppLayout>
            <div className='d-inline-flex flex-wrap justify-content-center'>                
                {movieShow === null ? dataMovies?.results?.map((item, index) => {
                    return (
                        <Link onClick={() => {showMovie(item)}} key={index}>                        
                            <div className='m-4'>
                                    <MovieCard
                                        image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                        title={item.original_title}
                                    />
                            </div>
                        </Link>
                    )
                }) :
                    <>
                    <Tooltip label='Regresar'>
                        <IconButton onClick={() => {setMovieShow(null)}} aria-label='Search database' icon={<ArrowBackIcon />} />
                    </Tooltip>
                        <br />
                        <ShowMovie
                            coverImage={'https://image.tmdb.org/t/p/original/' + movieShow?.poster_path}
                            title={movieShow?.original_title}
                            description={movieShow?.overview}
                            date={movieShow?.release_date}
                        />
                    </> 
                }
            </div>
        </AppLayout>
    )
}

export default Index;