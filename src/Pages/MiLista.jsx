import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import MovieCard from '../Components/MovieCard';
import ShowMovie from '../Components/ShowMovie';

import { Button, Tooltip, useToast } from '@chakra-ui/react'

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const MiLista = () => {
    const toast = useToast()
    
    const [movieShow, setMovieShow] = useState(null);
    const [mapArray, setMapArray] = useState(null);
    const [itemVideo, setItemVideo] = useState();

    const listArray = localStorage.getItem("list");
    
    const movieVideoURL = (input) => {
        return `https://api.themoviedb.org/3/movie/${input}/videos?language=en-US&api_key=${API_KEY}`;
    }

    const tvVideoURL = (input) => {
        return `https://api.themoviedb.org/3/tv/${input}/videos?language=en-US&api_key=${API_KEY}`
    }
    
    const globalSearch =  (input) => {
        setData(null)
        return `https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    };

    const fetchVideo = async (item) => {
        const { data } = await axios.get(item.original_title ? movieVideoURL(item.id) : tvVideoURL(item.id))
        setItemVideo(data?.results[0]?.key)
    }

    const showMovie = (data) => {
        setMovieShow(data);
        fetchVideo(data);
    }

    const deleteList = () => {
        localStorage.removeItem("list");
        setMapArray(null)
    }

    const deleteListItem = (data, index) => {
        const localList = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : localStorage.setItem("list" , '[]')
        
        localList.length === 1 ? deleteList() : localStorage.setItem("list" , JSON.stringify(localList.filter(el => el.id != data.id)))
        setMapArray(localList.filter(el => el.id != data.id))

        toast({
            title: `Se ha borrado ${data.original_title || data.original_name} de tu lista`,
            status: 'success',
            variant: 'left-accent',
            duration: 2000,
            isClosable: true,
        })    
    }

    useEffect(() => {       
        setMapArray(JSON.parse(listArray))
    },[]);

    return (
        <AppLayout> 
            {
                mapArray?.length > 0 ?
                <div className='d-flex flex-wrap justify-content-center'>
                    {movieShow === null ? mapArray?.filter(item => item.backdrop_path != null).map((item, index) => {
                        return (
                            <div key={index}>
                                <MovieCard
                                    onClick={() => {showMovie(item)}}
                                    image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                    title={item.original_title || item.original_name}
                                    buttons={
                                        <>
                                            <Tooltip label='Quitar'>
                                                <i className="bi bi-bookmark-fill text-danger"  onClick={() => {deleteListItem(item, index)}} />
                                            </Tooltip>
                                        </>
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
                                    (itemVideo != undefined || null) ? 
                                        <iframe 
                                            width="100%" 
                                            height="600" 
                                            src={`https://www.youtube.com/embed/${itemVideo}`} 
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
                :
                <div className='container' style={{height: '60vh'}}>
                    <div className='d-flex justify-content-center' style={{marginTop: '15vh'}}>
                        <img className='w-25' src="https://cdn.onlinewebfonts.com/svg/img_412721.png" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className='mt-3 fs-5 fw-light'>No se han encontrado elementos 😢</p>
                        <Link to="/">
                            <Button colorScheme='none' className='text-center fw-bold' style={{backgroundColor: '#e50914', color: 'white'}}>Ir a buscar</Button>
                        </Link>
                    </div>
                </div>
            }
        </AppLayout>
    )
}

export default MiLista
