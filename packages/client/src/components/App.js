import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  Link,
  VStack,
  HStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import MarketContext from './MarketContext';
import MarketBook from './MarketBook';
import Orders from './Orders';
import Fills from './Fills';

const initialMarketState = {
  symbol: 'NULL',
  bestBid: [`${Number.NEGATIVE_INFINITY}`, '0'],
  bestAsk: [`${Number.POSITIVE_INFINITY}`, '0'],
  orders: [],
  fills: [],
}

function App() {
  const [marketState, setMarketState] = React.useState(initialMarketState);
  
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');
    ws.addEventListener('open', () => {
      console.log('Connected to local WebSocket server');
    });
  
    ws.addEventListener('message', (event) => {
        const state = JSON.parse(event.data);
        setMarketState(state);
    });
  
    ws.addEventListener('close', () => {
        console.log('WebSocket connection closed');
    });
    return () => {
      // ws.removeEventListener('open', () => {});
      // ws.removeEventListener('message', () => {});
      // ws.close();
      // console.log('WebSocket connection closed.');
    };
  }, []);  // Empty dependency array means this effect only runs once on mount
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid minH="100vh" p={3}>
            <MarketContext.Provider value={{ marketState, setMarketState }}>
              <VStack 
                spacing={4} 
                maxW="100%" 
                overflowX="auto"
                align="flex-start"
              >
                <ColorModeSwitcher justifySelf="flex-end"/>
                <Heading size='md'>Market: {marketState.symbol}</Heading>
                <MarketBook/>
                <Heading size='md'>Orders:</Heading>
                <Orders/>
                <Heading size='md'>Fills:</Heading>
                <Fills/>
              </VStack>
            </MarketContext.Provider>      
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
