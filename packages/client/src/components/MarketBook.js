import React, { useContext } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from '@chakra-ui/react'
import MarketContext from './MarketContext';

const MarketBook = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <Card w='100%' h='100%'>
      <CardHeader>
        <Heading size='md'>Market: {marketState.symbol}</Heading>
      </CardHeader>
      <CardBody>
        {marketState.symbol !== 'NULL' &&(
        <StatGroup w="50vw">
          <Stat>
            <StatLabel>Best Bid</StatLabel>
            <StatNumber>{marketState.bestBid[0]}</StatNumber>
            <StatHelpText>
              {/* <StatArrow type='increase' /> */}
              {marketState.bestBid[1]}
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Best Ask</StatLabel>
            <StatNumber>{marketState.bestAsk[0]}</StatNumber>
            <StatHelpText>
              {/* <StatArrow type='decrease' /> */}
              {marketState.bestAsk[1]}
            </StatHelpText>
          </Stat>
        </StatGroup>
        )}
        {marketState.symbol === 'NULL' && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>No market data detected!</AlertTitle>
            <AlertDescription>Make sure you are connected to the internet.</AlertDescription>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};

export default MarketBook;
