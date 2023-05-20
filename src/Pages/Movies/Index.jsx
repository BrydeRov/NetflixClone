import AppLayout from '../Layouts/AppLayout'
import { useState } from 'react'
import '../../assets/css/MovieCard.css'

import witcher from '../../../public/Images/witcher.jpg'
import axios from 'axios'
import { Image } from '@chakra-ui/react'
import { useEffect } from 'react'


const Index = () => {
    const [dataMovies, setDataMovies] = useState('')

    const fetchDataMovies = async () =>{
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=d7946e2b0e8a32d77695184bde02cd1d')
        setDataMovies(data)
        console.log(data)
    } 
    
    useEffect(() => {
        fetchDataMovies()
    }, []);
    
    return (
        <AppLayout>
            <div className="netflix-card">
                <img className="netflix-card__image" src={witcher} alt='wenas' />
                <div className="netflix-card__content">
                    <h2 className="netflix-card__title">The Witcher</h2>
                </div>
            </div>
            <div className="netflix-card">
                <img className="netflix-card__image" src='https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/33e62911-2708-4875-9c71-9926f571e1c1/The%2BBatman.jpg?format=1000w' alt='wenas' />
                <div className="netflix-card__content">
                    <h2 className="netflix-card__title">Batman</h2>
                </div>
            </div>
        </AppLayout>
    )
}

export default Index;