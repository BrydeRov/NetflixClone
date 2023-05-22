// Other
import axios from 'axios';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Chakra UI
import { Image, Button, IconButton, Tooltip, Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowDownIcon } from '@chakra-ui/icons';
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

    const showMovie = (data) => {
        setMovieShow(data);
    }

    
    return (
        <AppLayout>
            <div className='d-flex flex-wrap justify-content-center'>
                {dataMovies === null ? 
                    <div>
                        <Skeleton height='20px' /> 
                        <Skeleton height='20px' /> 
                        <Skeleton height='20px' /> 
                        <Skeleton height='20px' /> 
                        <Skeleton height='20px' /> 
                        <Skeleton height='20px' /> 
                    </div>
                    : 
                    movieShow === null ? dataMovies?.results?.map((item, index) => {
                    return (
                        <>
                            <MovieCard
                                key={index}
                                onClick={() => {showMovie(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.original_title}
                            />
                        </>
                        // <div className='col-4' key={index}>
                        //     <Link onClick={() => {showMovie(item)}}>                        
                        //     </Link>
                        // </div>
                    )
                }) :
                    <>
                    <Tooltip label='Regresar'>
                        <IconButton
                            colorScheme='blue' 
                            onClick={() => {setMovieShow(null)}} 
                            aria-label='Search database' 
                            icon={<ArrowBackIcon />} 
                        />
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