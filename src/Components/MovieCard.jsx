import React from 'react'
import '../assets/css/MovieCard.css'

const MovieCard = (props) => {
    return (
        <div className="netflix-card my-3" onClick={props.onClick}>
            <img 
                className="netflix-card__image" 
                src={props.image} 
                alt={props.title} 
            />
            <div className="netflix-card__content">
                <h2 className="netflix-card__title">{props.title}</h2>
                <p className="fs-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nam!
                </p>
            </div>
        </div>
    )
}

export default MovieCard;