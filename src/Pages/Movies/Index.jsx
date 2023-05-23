// Other
import axios from 'axios';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// Chakra UI
import { Image, Button,Stack, IconButton, Tooltip, Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowDownIcon, SearchIcon } from '@chakra-ui/icons';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

// Components
import AppLayout from '../Layouts/AppLayout';
import MovieCard from '../../Components/MovieCard';
import ShowMovie from '../../Components/ShowMovie';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

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

    // useEffect(() => {
    //     setList(localStorage.getItem("list"))
    // }, []);

    const showMovie = (data) => {
        setMovieShow(data);
    }

    const addToList = (data) => {
        localStorage.getItem("list") ? localStorage.setItem("list" , localStorage.getItem("list").push() + data.push()) : localStorage.setItem("list" , data)
        console.log(localStorage.getItem("list"))
    }

    
    return (
        <AppLayout>
            <div className='d-flex flex-wrap justify-content-center'>
                { movieShow === null ? dataMovies?.results?.map((item, index) => {
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