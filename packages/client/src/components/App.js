import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Flex,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import MarketContext from './MarketContext';
import MarketBook from './MarketBook';
import Orders from './Orders';
import ControlPanel from './ControlPanel';
import Fills from './Fills';

const initialMarketState = {
  tradingEnabled: false,
  symbol: 'NULL',
  bestBid: [`${Number.NEGATIVE_INFINITY}`, '0'],
  bestAsk: [`${Number.POSITIVE_INFINITY}`, '0'],
  orders: [],
  fills: [],
}

function App() {
  const [marketState, setMarketState] = React.useState(initialMarketState);
  const [webSocket, setWebSocket] = React.useState(null);

  useEffect(()=>{
    
    //ws://localhost:8080
    const WEBSOCKET_HOST = process.env.REACT_APP_WEBSOCKET_HOST;
    const ws = new WebSocket(WEBSOCKET_HOST);
    
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
    setWebSocket(ws);
    return () => {
      // ws.removeEventListener('open', () => {});
      // ws.removeEventListener('message', () => {});
      // ws.close();
      // console.log('WebSocket connection closed.');
    };
  }, [setWebSocket]);  // Empty dependency array means this effect only runs once on mount
  return (
    <ChakraProvider theme={theme}>
      <MarketContext.Provider value={{ marketState, setMarketState }}>
        <Flex
          direction='column' 
          gap='4'
          w='100vw'
          h='96vh'
          alignItems='center'
          align="stretch"
        >
          <ColorModeSwitcher alignSelf='flex-end'/>
          <Flex direction='row' align="stretch" grow="1" gap='4'>
            <Flex direction='column' w='44vw' align="stretch" gap='4'>
              <Flex direction='row' gap='4'>
                <ControlPanel w='5vw' websocket={webSocket}/>
                <MarketBook  />
              </Flex>
              <Orders/>
            </Flex>
            <Flex direction='column' w='44vw' gap='4'>
              <Fills />
            </Flex>
          </Flex>
        </Flex>
      </MarketContext.Provider> 
    </ChakraProvider>
  );
}

export default App;
