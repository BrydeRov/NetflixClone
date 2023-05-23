import React from 'react';
import AppTopBar from './AppTopBar';
import { ChakraProvider, extendTheme, Box, CSSReset, ColorModeScript } from "@chakra-ui/react";

function AppLayout(props) {
    const config = {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    }
    
    const theme = extendTheme({ config })
    return (
        <ChakraProvider theme={theme}>
            <div className="bg-dark text-white" style={{height: '100vh'}}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <CSSReset />
                <Box>
                    <AppTopBar />
                    <div className="">
                        {props.children}
                    </div>
                </Box>
            </div>
        </ChakraProvider>
    );
}

export default AppLayout;
