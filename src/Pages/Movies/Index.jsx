// Other
import axios from 'axios'

// React
import { useEffect, useState } from 'react'
// Components
import AppLayout from '../Layouts/AppLayout'
import MovieCard from '../../Components/MovieCard'

const Index = () => {
    const [dataMovies, setDataMovies] = useState([])

    const fetchDataMovies = async () =>{
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=d7946e2b0e8a32d77695184bde02cd1d')
        setDataMovies(data)
    } 
    
    useEffect(() => {
        fetchDataMovies()
    }, []);
    
    return (
        <AppLayout>
            <div className='d-inline-flex flex-wrap justify-content-center'>                
                {dataMovies?.results?.map((item, index) => {
                    return (
                        <div className='m-4' key={index}>
                            <MovieCard
                                image={'https://image.tmdb.org/t/p/original/' + item.backdrop_path}
                                title={item.original_title}
                            />
                        </div>
                    )
                })}
            </div>
        </AppLayout>
    )
}

export default Index;