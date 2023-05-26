import React from 'react'

// Chakra UI
import { Image, Stack, Card, CardBody, CardFooter, Heading,Button } from '@chakra-ui/react'

const ShowMovie = (props) => {
    return (
        <>
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${props.videoKey}`} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />
            <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' className="bg-dark text-white border-dark">
                <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }}
                    src={props.coverImage}
                    alt={props.title} 
                />
                <Stack>
                    <CardBody>
                        <Heading size='md'>{props.title}</Heading>

                        <p className='py-2'>
                            {props.description}
                        </p>
                    </CardBody>

                    <CardFooter>
                        {props.footer}
                    </CardFooter>
                </Stack>
            </Card>
        </>
    )
}

export default ShowMovie
