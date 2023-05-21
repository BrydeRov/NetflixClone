// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'
// Components
import AppLayout from '../Layouts/AppLayout'
import MovieCard from '../../Components/MovieCard'

const Index = () => {
    const [dataTV, setDataTV] = useState([])

    const fetchDataTV = async () =>{
        const { data } = await axios.get('https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=d7946e2b0e8a32d77695184bde02cd1d')
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