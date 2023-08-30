import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import MarketContext from './MarketContext';
import MarketBook from './MarketBook';
import Orders from './Orders';
import Fills from './Fills';

const initialMarketState = {
  book: {},
  orders: [],
  fills: [],
}

function App() {
  const [marketState, setMarketState] = React.useState(initialMarketState);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <MarketContext.Provider value={{ marketState, setMarketState }}>
              <MarketBook/>
              <Orders/>
              <Fills/>
            </MarketContext.Provider>      
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
