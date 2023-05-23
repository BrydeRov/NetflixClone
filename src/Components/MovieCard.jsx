import React from 'react'
import '../assets/css/MovieCard.css'
import { Image, Card, CardBody, Heading} from '@chakra-ui/react'

const MovieCard = (props) => {
    return (
        <Card maxW={{ base: '100%', sm: '300px' }} size="sm"  onClick={props.onClick} className='netflix-card rounded m-3'>
                <Image
                    className='rounded'
                    // objectFit='cover'
                    src={props.image    }
                    alt='Chakra UI'
                />
                <CardBody className='netflix-card__content'>
                    <Heading size='sm'>{props.title}</Heading>
                </CardBody>
            </Card>
        // <div className='netflix-card m-3'>
        // </div>
        // <div className="netflix-card my-3" onClick={props.onClick}>
        //     <img 
        //         className="netflix-card__image" 
        //         src={props.image} 
        //         alt={props.title} 
        //     />
        //     <div className="netflix-card__content">
        //         <h2 className="netflix-card__title">{props.title}</h2>
        //         <p className="fs-6">
        //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nam!
        //         </p>
        //     </div>
        // </div>
    )
}

export default MovieCard;