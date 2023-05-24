import React, { useEffect, useState } from 'react'

import AppLayout from './Layouts/AppLayout';

import MovieCard from '../Components/MovieCard';
import ShowMovie from '../Components/ShowMovie';

import { Button, Tooltip, Input, Skeleton } from '@chakra-ui/react'

const MiLista = () => {
    const [list, setList] = useState([]);
    const [movieShow, setMovieShow] = useState(null);
    const data = JSON.parse(localStorage.getItem("list"));
    console.log(data[0].original_title)
    // console.log(data?.original_title)
    console.log(typeof(data));
    
    useEffect(() => {
        // setList([data])
    },[]);

    return (
        <AppLayout>
            <p>
                {list}
            </p>
            <div className='d-flex flex-wrap justify-content-center'>
                
                {movieShow === null ? data?.filter(item => item.backdrop_path != null).map((item, index) => {
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

export default MiLista
