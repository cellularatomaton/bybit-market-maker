import React, {useContext} from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react';
import MarketContext from './MarketContext';
const ControlPanel = ({websocket}) => {
  const { marketState } = useContext(MarketContext);
  const sendData = (data) => {
    if(websocket && websocket.readyState === WebSocket.OPEN){
      websocket.send(JSON.stringify(data));
    }else{
      console.log('WebSocket not open or not available.');
    }
  };
  const handleStart = () => {
    sendData({
      command: 'START'
    });
  };
  const handleStop = () => {
    sendData({
      command: 'STOP'
    });
  };
  return (
    <Card w='100%' h='100%'>
      <CardHeader>
        <HStack>
          <Heading size='md'>Trading:</Heading>
          {marketState.tradingEnabled && (
            <Badge variant='solid' colorScheme='blue'>
              Enabled
            </Badge>
          )}
          {!marketState.tradingEnabled && (
            <Badge variant='solid' colorScheme='red'>
              Disabled
            </Badge>  
          )}
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack>
          <Button
            w='100%' 
            size='md' 
            spacing='6' 
            variant='outline' 
            color='var(--chakra-colors-blue-400)'
            onClick={handleStart}
          >START</Button>
          <Button 
            w='100%' 
            size='md' 
            spacing='6' 
            variant='outline' 
            color='var(--chakra-colors-red-400)'
            onClick={handleStop}
          >STOP</Button>
        </VStack>
      </CardBody>
    </Card>
  )
};

export default ControlPanel;