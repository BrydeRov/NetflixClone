// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'

// Components
import AppLayout from '../Layouts/AppLayout'
import MovieCard from '../../Components/MovieCard'
import ShowMovie from '../../Components/ShowMovie'
// Chakra UI
import { Button, Input, useToast, Tooltip } from '@chakra-ui/react';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const URL = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`;

const Index = () => {
    const toast = useToast()

    // UseState
    const [myList, setMyList] = useState();
    const [dataTV, setDataTV] = useState([])
    const [tvVideo, setTvVideo] = useState();
    const [query, setQuery] = useState(null);
    const [tvShow, setTvShow] = useState(null)
    const [loading, setLoading] = useState(true);
    
    
    const tvSearchURL =  (input) => {
        setDataTV(null)
        return `https://api.themoviedb.org/3/search/tv?query=${input}&api_key=${API_KEY}`;
    };

    const fetchDataTV = async () =>{
        const { data } = await axios.get(query === null ? URL : tvSearchURL(query))
        setDataTV(data)
    } 

    const fetchVideo = async (tv_id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/season/1/videos?api_key=${API_KEY}`)
        setTvVideo(data?.results[0]?.key)
        console.log(data.results[0].key)
    }

    const showTV = (data) => {
        setTvVideo(null)
        fetchVideo(data.id);
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

        toast({
            title: data.original_name + ' agregada a tu lista 🎥',
            description: "¡Ve a tu lista para ver las peliculas guardadas!",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    useEffect(() => {
        fetchDataTV()
        setMyList(JSON.parse(localStorage.getItem("list")))
    }, []);
    
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
                        <div key={index}>
                            <MovieCard
                                onClick={() => {showTV(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.name}
                                buttons={
                                    <Tooltip label={myList?.find(el => el.name == item.name) ? 'Agregada' : 'Agregar'}>
                                        <i className={`${myList?.find(el => el.name == item.name) ? 'bi bi-bookmark-fill text-danger' : 'bi bi-bookmark'}`} onClick={() => {addToList(item)}}></i>
                                    </Tooltip>
                                }
                            />
                        </div>
                    </>
                )
            }) :
                <>
                    <br />
                    <ShowMovie
                        coverImage={'https://image.tmdb.org/t/p/original/' + tvShow?.poster_path}
                        title={tvShow?.original_title}
                        description={tvShow?.overview}
                        videoFrame={
                            (tvVideo != undefined || null) ? 
                            <iframe 
                                width="560" 
                                height="315" 
                                src={`https://www.youtube.com/embed/${tvVideo}`} 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            />
                            : ''
                        }
                        // videoKey={tvVideo}
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