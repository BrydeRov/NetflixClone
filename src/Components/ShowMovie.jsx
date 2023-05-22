import React from 'react'

const ShowMovie = (props) => {
    return (
        <div className="card mb-3 border-0 ms-3" style={{maxWidth: '540px'}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={props.coverImage} className="img-fluid rounded-start" alt={props.title} />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-body-secondary">{props.date}</small></p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ShowMovie
