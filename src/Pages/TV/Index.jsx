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

const tvSearchURL =  (input) => {
    return `https://api.themoviedb.org/3/search/tv?query=${input}`;
};
const Index = () => {
    const [dataTV, setDataTV] = useState([])
    const [tvShow, setTvShow] = useState(null)
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);
    

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
            { tvShow === null ? dataTV?.results?.map((item, index) => {
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