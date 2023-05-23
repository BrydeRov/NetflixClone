import React from 'react'

// Chakra UI
import { Image, Stack, Card, CardBody, CardFooter, Heading,Button } from '@chakra-ui/react'

const ShowMovie = (props) => {
    return (
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
        // <div className=''>
        //     <div className="card mb-3 border-0 bg-dark" style={{maxWidth: '540px'}}>
        //         <div className="row g-0">
        //             <div className="col-md-4">
        //             <img src={props.coverImage} className="img-fluid rounded-start" alt={props.title} />
        //             </div>
        //             <div className="col-md-8">
        //             <div className="card-body">
        //                 <h5 className="card-title">{props.title}</h5>
        //                 <p className="card-text">{props.description}</p>
        //                 <p className="card-text"><small className="text-body-secondary">{props.date}</small></p>
        //             </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ShowMovie
