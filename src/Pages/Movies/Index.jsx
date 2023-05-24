// Other
import axios from 'axios';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// Chakra UI
import { Button, Tooltip, Input, Skeleton } from '@chakra-ui/react'

// Components
import AppLayout from '../Layouts/AppLayout';
import MovieCard from '../../Components/MovieCard';
import ShowMovie from '../../Components/ShowMovie';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const Index = () => {
    const [dataMovies, setDataMovies] = useState([])
    const [movieShow, setMovieShow] = useState(null)
    const [query , setQuery] = useState(null);
    const [loading , setLoading] = useState(true);
    const movieURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}`
    
    const movieSearchURL = (input) => {
        setDataMovies(null)
        setLoading(false)
        return `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${API_KEY}`;
    }

    const fetchDataMovies = async () =>{
        const { data } = await axios.get(query === null ? movieURL : movieSearchURL(query));
        setDataMovies(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchDataMovies()
    }, []);

    const showMovie = (data) => {
        setMovieShow(data);
    }

    const addToList = (data) => {
        console.log(data)
        // localStorage.getItem("list") ? localStorage.setItem("list" , localStorage.getItem("list").push() + data.push()) : localStorage.setItem("list" , data)
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchDataMovies(    )
        }
    };

    
    return (
        <AppLayout 
            inputSearch={
                <Input 
                    placeholder='Buscar . . .' 
                    style={{color: 'white'}}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            } 
        >
            <div className='d-flex flex-wrap justify-content-center'>
                
                { loading === true ? 
                [...Array(15)].map((_, index) => (
                    <Skeleton
                        key={index}
                        height='180px'
                        width='330px'
                        className='rounded m-3'
                    />
                )) : movieShow === null ? dataMovies?.results?.filter(item => item.backdrop_path != null).map((item, index) => {
                    return (
                        <>
                            <MovieCard
                                key={index}
                                onClick={() => {showMovie(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.original_title}
                                buttons={
                                    <Tooltip label='Agregar'>
                                        <i className="bi bi-bookmark" onClick={() => {addToList(item)}}></i>
                                    </Tooltip>
                                }
                            />
                        </>
                    )
                }) :
                    <>
                        <br />
                        <ShowMovie
                            coverImage={'https://image.tmdb.org/t/p/original/' + movieShow?.poster_path}
                            title={movieShow?.original_title}
                            description={movieShow?.overview}
                            date={movieShow?.release_date}
                            footer={
                                <>
                                    <Button colorScheme='red' onClick={() => {setMovieShow(null)}} >
                                        Regresar
                                    </Button>
                                    <Button className='mx-2' colorScheme='messenger' onClick={() => {setMovieShow(null)}} >
                                        Ver Trailer
                                    </Button>
                                </>
                            }
                        />
                    </> 
                }
            </div>
        </AppLayout>
    )
}

export default Index;