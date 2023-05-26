import React, { useEffect, useState } from 'react'

import AppLayout from './Layouts/AppLayout';
import { Link } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import ShowMovie from '../Components/ShowMovie';

import { Button, Tooltip } from '@chakra-ui/react'

import { DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';

const MiLista = () => {
    const [movieShow, setMovieShow] = useState(null);
    const [mapArray, setMapArray] = useState(null);
    

    const listArray = localStorage.getItem("list");
    
    useEffect(() => {
        setMapArray(JSON.parse(listArray))
    },[]);

    const showMovie = (data) => {
        setMovieShow(data);
    }

    const deleteList = () => {
        localStorage.removeItem("list");
        setMapArray(null)
    }

    return (
        <AppLayout> 
            <div className='d-flex flex-wrap justify-content-start container'>
                <Button className="my-2" onClick={() => {deleteList()}} leftIcon={<DeleteIcon />} colorScheme='red' variant='solid'>
                    Borrar peliculas de mi lista
                </Button>
            </div>

            <div className='d-flex flex-wrap justify-content-center'>
                {movieShow === null ? mapArray?.filter(item => item.backdrop_path != null).map((item, index) => {
                    return (
                        <>
                            <MovieCard
                                key={index}
                                onClick={() => {showMovie(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.original_title || item.original_name}
                                buttons={
                                    <Tooltip label='Guardada'>
                                        <i className="bi bi-bookmark-fill text-danger"></i>
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

export default MiLista
