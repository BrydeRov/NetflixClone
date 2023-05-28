import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import MovieCard from '../Components/MovieCard';
import ShowMovie from '../Components/ShowMovie';

import { Button, Tooltip, useToast } from '@chakra-ui/react'

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
