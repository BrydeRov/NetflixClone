import React, { useEffect, useState } from 'react'

import AppLayout from './Layouts/AppLayout';
import MovieCard from '../Components/MovieCard';
import ShowMovie from '../Components/ShowMovie';

import { Button, Tooltip, useToast } from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons';

const MiLista = () => {
    const toast = useToast()
    
    const [movieShow, setMovieShow] = useState(null);
    const [mapArray, setMapArray] = useState(null);
    
    const listArray = localStorage.getItem("list");
    

    const showMovie = (data) => {
        setMovieShow(data);
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
            duration: 2000,
            isClosable: true,
        })    
    }

    useEffect(() => {       
        setMapArray(JSON.parse(listArray))
    },[]);

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
                                    <>
                                        <Tooltip label='Quitar'>
                                            <i className="bi bi-bookmark-fill text-danger"  onClick={() => {deleteListItem(item, index)}} />
                                        </Tooltip>
                                    </>
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
