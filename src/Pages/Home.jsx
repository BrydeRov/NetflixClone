// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'

// Components
import AppLayout from './Layouts/AppLayout'
import MovieCard from '../Components/MovieCard'
import ShowMovie from '../Components/ShowMovie'
// Chakra UI
import { Button, Input, useToast, Tooltip } from '@chakra-ui/react';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const URL = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;

const Home = () => {
    const toast = useToast()

    // UseState
    const [myList, setMyList] = useState();
    const [data, setData] = useState([])
    const [tvVideo, setTvVideo] = useState();
    const [query, setQuery] = useState(null);
    const [show, setShow] = useState(null)

    const [loading, setLoading] = useState(true);
    
    
    const tvSearchURL =  (input) => {
        setData(null)
        return `https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    };

    const fetchData = async () =>{
        const { data } = await axios.get(query === null ? URL : tvSearchURL(query))
        setData(data)
    } 

    const fetchVideo = async (tv_id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}/season/1/videos?api_key=${API_KEY}`)
        setTvVideo(data?.results[0]?.key)
    }

    const showSelected = (data) => {
        setTvVideo(null)
        fetchVideo(data.id);
        setShow(data);
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData()
        }
    };

    const addToList = (data) => {
        const localList = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : localStorage.setItem("list" , '[]')
        localList === undefined ? [data] : localList.push(data);

        localStorage.setItem("list" , JSON.stringify(localList))
        
        setMyList(localList)

        toast({
            title: data.name || data.original_title + ' agregada a tu lista 🎥',
            description: "¡Ve a tu lista para ver las peliculas guardadas!",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    useEffect(() => {
        fetchData()
        setMyList(JSON.parse(localStorage.getItem("list")))
    }, []);
    
    return (
        <AppLayout inputSearch={
            <Input 
                placeholder='Buscar . . .' 
                style={{color: 'white'}}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />} 
        >
            {/* ==================== CAROUSEL ==================== */}
            {
                show ? '' :
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        {data?.results?.slice(0 , 3).map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} className="d-block w-100" style={{height: '75vh', objectFit: 'cover', objectPosition:'50% 15%'}} alt={item.name} />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{item.name || item.original_title}</h5>
                                            {/* <p>{index}</p> */}
                                        </div>                                
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            }
            
            {/* ==================== CARDS ==================== */}
            <div className='d-flex flex-wrap justify-content-center'>
                { show === null ? data?.results?.filter(item => item.backdrop_path != null).map((item, index) => {
                    return (
                        <div key={index}>
                            <MovieCard
                                onClick={() => {showSelected(item)}}
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.name || item?.original_title}
                                buttons={
                                    <Tooltip label={myList?.find(el => (el.original_title || el.name) == (item.name ? item.name : item.original_title)) ? 'Agregada' : 'Agregar'}>
                                        <i className={`${myList?.find(el => (el.original_title || el.name) == (item.name ? item.name : item.original_title)) ? 'bi bi-bookmark-fill text-danger' : 'bi bi-bookmark'}`} onClick={() => {addToList(item)}}></i>
                                    </Tooltip>
                                }
                            />
                        </div>
                    )
                }) :
                    <>
                        <br />
                        <ShowMovie
                            coverImage={'https://image.tmdb.org/t/p/original/' + show?.poster_path}
                            title={show?.original_title || show?.name}
                            description={show?.overview}
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
                                    <Button colorScheme='red' onClick={() => {setShow(null)}} >
                                        Regresar
                                    </Button>
                                    <Button className='mx-2' colorScheme='messenger' onClick={() => {setShow(null)}} >
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

export default Home;