// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'
// Components
import AppLayout from '../Layouts/AppLayout'
import MovieCard from '../../Components/MovieCard'

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

const Index = () => {
    const [dataTV, setDataTV] = useState([])

    const fetchDataTV = async () =>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${API_KEY}`)
        setDataTV(data)
    } 
    
    useEffect(() => {
        fetchDataTV()
    }, []);
    
    return (
        <AppLayout>
            <div className='d-inline-flex flex-wrap justify-content-center'>                
                {dataTV?.results?.map((item, index) => {
                    return (
                        <div className='m-4' key={index}>
                            <MovieCard
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.name}
                            />
                        </div>
                    )
                })}
            </div>
        </AppLayout>
    )
}

export default Index;