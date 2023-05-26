// Other
import axios from 'axios';

// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// Chakra UI
import { Button, Tooltip, Input, Skeleton, useToast } from '@chakra-ui/react'

// Components
import AppLayout from '../Layouts/AppLayout';
import MovieCard from '../../Components/MovieCard';
import ShowMovie from '../../Components/ShowMovie';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const Index = () => {
    const toast = useToast()
    const [dataMovies, setDataMovies] = useState([])
    const [movieShow, setMovieShow] = useState(null)
    const [query , setQuery] = useState(null);
    const [loading , setLoading] = useState(true);
    const [myList, setMyList] = useState();
    const [movieVideo, setMovieVideo] = useState('');
    

    const movieURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}`

    const movieSearchURL = (input) => {
        setDataMovies(null)
        return `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${API_KEY}`;
    }

    const fetchDataMovies = async () =>{
        setLoading(true)
        const { data } = await axios.get(query === null ? movieURL : movieSearchURL(query));
        setDataMovies(data)
        setLoading(false)
    }
    

    const fetchVideo = async (movie_id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US&api_key=${API_KEY}`)
        setMovieVideo(data?.results[0].key)
    }
    
    const showMovie = (data) => {
        setMovieVideo(null)
        fetchVideo(data.id)
        setMovieShow(data);
    }

    const addToList = (data) => {
        const localList = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : localStorage.setItem("list" , '[]')
        localList === undefined ? [data] : localList.push(data);

        localStorage.setItem("list" , JSON.stringify(localList))
        
        toast({
            title: data.original_title + ' agregada a tu lista 🎥',
            description: "¡Ve a tu lista para ver las peliculas guardadas!",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }
    
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchDataMovies(    )
        }
    };
    
    useEffect(() => {
        fetchDataMovies()
        setMyList(JSON.parse(localStorage.getItem('list')))
    }, []);
    
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
                        startColor='gray.400' 
                        endColor='red.500'
                        height='180px'
                        width='330px'
                        className='rounded m-3'
                    />
                )) : movieShow === null ? dataMovies?.results?.filter(item => item.backdrop_path != null).map((item, index) => {
                    return (
                        <div key={index}>
                            <MovieCard
                                onClick={() => {showMovie(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.original_title}
                                buttons={
                                    <Tooltip label={myList?.find(el => el.original_title == item.original_title) ? 'Remover' : 'Agregar'}>
                                        <i className={`${myList?.find(el => el.original_title == item.original_title) ? 'bi bi-bookmark-fill text-danger' : 'bi bi-bookmark'}`} onClick={() => {addToList(item)}}></i>
                                    </Tooltip>
                                }
                            />
                        </div>
                    )
                }) :
                    <>
                        <br />
                        <ShowMovie
                            coverImage={'https://image.tmdb.org/t/p/original/' + movieShow?.poster_path}
                            title={movieShow?.original_title}
                            description={movieShow?.overview}
                            date={movieShow?.release_date}
                            videoFrame={
                                (movieVideo != undefined || null) ? 
                                    <iframe 
                                        width="100%" 
                                        height="500" 
                                        src={`https://www.youtube.com/embed/${movieVideo}`} 
                                        title="YouTube video player" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen
                                    />
                                : ''
                            }
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