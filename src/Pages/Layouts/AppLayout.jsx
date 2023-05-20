import React from 'react';
import AppTopBar from './AppTopBar';
import { ChakraProvider } from '@chakra-ui/react';

function AppLayout(props) {
    return (
        <ChakraProvider>
            <AppTopBar />
            <div className="">
                {props.children}
            </div>
        </ChakraProvider>
    );
}

export default AppLayout;
