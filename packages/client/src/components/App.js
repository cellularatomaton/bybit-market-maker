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
    
    //https://bybit-strategy-m4ovodbsva-zf.a.run.app
    const ws = new WebSocket('ws://bybit-strategy-m4ovodbsva-zf.a.run.app');
    
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
            <Flex direction='column' w='70vw' align="stretch" gap='4'>
              <Flex direction='row' gap='4'>
                <ControlPanel  websocket={webSocket}/>
                <MarketBook />
              </Flex>
              <Fills />
            </Flex>
            <Flex direction='column' w='25vw' gap='4'>
              <Orders/>
            </Flex>
          </Flex>
        </Flex>
      </MarketContext.Provider> 
    </ChakraProvider>
  );
}

export default App;
