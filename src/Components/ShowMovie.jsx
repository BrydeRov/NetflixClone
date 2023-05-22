import React from 'react'

const ShowMovie = (props) => {
    return (
        <div className=''>
            <iframe 
                width="100%" 
                height="500" 
                src="https://www.youtube.com/embed/760qRz6zwW4" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />
            <div className="card mb-3 border-0 bg-dark" style={{maxWidth: '540px'}}>
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
        </div>
    )
}

export default ShowMovie
