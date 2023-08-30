import React, { useContext } from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import MarketContext from './MarketContext';

const MarketBook = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Best Bid</StatLabel>
        <StatNumber>{marketState.book.data.b[0][0]}</StatNumber>
        <StatHelpText>
          {/* <StatArrow type='increase' /> */}
          {marketState.book.data.b[0][1]}
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Best Ask</StatLabel>
        <StatNumber>{marketState.book.data.a[0][0]}</StatNumber>
        <StatHelpText>
          {/* <StatArrow type='decrease' /> */}
          {marketState.book.data.a[0][1]}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default MarketBook;
