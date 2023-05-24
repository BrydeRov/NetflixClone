// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'

// Components
import AppLayout from '../Layouts/AppLayout'
import MovieCard from '../../Components/MovieCard'
import ShowMovie from '../../Components/ShowMovie'
// Chakra UI
import { Button, Input } from '@chakra-ui/react';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const URL = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;

const Index = () => {
    const [dataTV, setDataTV] = useState([])
    const [tvShow, setTvShow] = useState(null)
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const tvSearchURL =  (input) => {
        setDataTV(null)
        return `https://api.themoviedb.org/3/search/tv?query=${input}&api_key=${API_KEY}`;
    };

    const fetchDataTV = async () =>{
        const { data } = await axios.get(query === null ? URL : tvSearchURL(query))
        setDataTV(data)
    } 
    
    useEffect(() => {
        fetchDataTV()
    }, []);

    const showTV = (data) => {
        setTvShow(data);
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchDataTV()
        }
    };
    
    const addToList = (data) => {
        const localList = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : localStorage.setItem("list" , '[]')
        localList === undefined ? [data] : localList.push(data);

        localStorage.setItem("list" , JSON.stringify(localList))
    }
    
    return (
        <AppLayout inputSearch={
            <Input 
                placeholder='Buscar . . .' 
                style={{color: 'white'}}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        } >
        <div className='d-flex flex-wrap justify-content-center'>
            { tvShow === null ? dataTV?.results?.filter(item => item.backdrop_path != null).map((item, index) => {
                return (
                    <>
                        <MovieCard
                            key={index}
                            onClick={() => {showTV(item)}}
                            image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                            title={item.name}
                            footer="wenas"
                        />
                    </>
                )
            }) :
                <>
                    <br />
                    <ShowMovie
                        coverImage={'https://image.tmdb.org/t/p/original/' + tvShow?.poster_path}
                        title={tvShow?.original_title}
                        description={tvShow?.overview}
                        date={tvShow?.release_date}
                        footer={
                            <>
                                <Button colorScheme='red' onClick={() => {setTvShow(null)}} >
                                    Regresar
                                </Button>
                                <Button className='mx-2' colorScheme='messenger' onClick={() => {setTvShow(null)}} >
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