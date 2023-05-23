import React from 'react'
import '../assets/css/MovieCard.css'
import { Image, Card, CardBody, Heading } from '@chakra-ui/react'

const MovieCard = (props) => {
    return (
        <Card maxW={{ base: '100%', sm: '300px' }} size="sm" className='netflix-card rounded m-3'>
                <Image
                    className='rounded'
                    src={props.image    }
                    alt='Chakra UI'
                    onClick={props.onClick} 
                />
                <CardBody className='netflix-card__content'>
                    <Heading size='sm'>{props.title}</Heading>
                    {props.buttons}
                </CardBody>
            </Card>
    )
}

export default MovieCard;