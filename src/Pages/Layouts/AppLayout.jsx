import React, { useEffect } from 'react';

// Components
import AppTopBar from './AppTopBar';
import AppFooter from './AppFooter';

// Chakra
import { ChakraProvider, extendTheme, Box, CSSReset, ColorModeScript } from "@chakra-ui/react";

function AppLayout(props) {
    useEffect(() => {
        if(!localStorage.getItem("list")){
            localStorage.setItem("list" , '[]')
        } 
    }, []);

    const config = {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    }
    
    const theme = extendTheme({ config })
    return (
        <ChakraProvider theme={theme}>
            <div className="text-white" style={{height: '100%'}}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <CSSReset />
                <Box>
                    <AppTopBar inputSearch={props.inputSearch}/>
                    <div className="">
                        {props.children}
                    </div>
                </Box>
            </div>

            <AppFooter/>
        </ChakraProvider>
    );
}

export default AppLayout;
