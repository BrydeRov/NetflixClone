import React from 'react';
import AppTopBar from './AppTopBar';
import { ChakraProvider, extendTheme, Box, CSSReset, ColorModeScript } from "@chakra-ui/react";

function AppLayout(props) {
    const config = {
        initialColorMode: 'dark',
        useSystemColorMode: false,
      }
      
      // 3. extend the theme
      const theme = extendTheme({ config })
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Box>
                <AppTopBar />
                <div className="">
                    {props.children}
                </div>
            </Box>
        </ChakraProvider>
    );
}

export default AppLayout;
