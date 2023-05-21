import React from 'react'
import '../assets/css/MovieCard.css'

const MovieCard = (props) => {
    return (
        <>
            <div className="netflix-card">
                <img 
                    className="netflix-card__image" 
                    src={props.image} 
                    alt={props.title} 
                />
                <div className="netflix-card__content">
                    <h2 className="netflix-card__title">{props.title}</h2>
                </div>
            </div>
        </>
    )
}

export default MovieCard
