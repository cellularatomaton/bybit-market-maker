import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import MarketContext from './MarketContext';

const Fills = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <Card w='100%' h='100%'>
      <CardHeader>
      <Heading size='md'>Fills</Heading>
      </CardHeader>
      <CardBody overflow="auto">
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>category</Th>
                <Th>symbol</Th>
                <Th>side</Th>
                <Th isNumeric>execPrice</Th>
                <Th isNumeric>execQty</Th>
                <Th isNumeric>execFee</Th>
                <Th>execTime</Th>
              </Tr>
            </Thead>
            <Tbody>
            {marketState.fills.map(fill => (
              <Tr 
                key={fill.execId} 
                color={
                  fill.side==='Buy' ? 
                  'var(--chakra-colors-blue-400)' :
                  'var(--chakra-colors-red-400)'
                }
              >
                <Td>{fill.category}</Td>
                <Td>{fill.symbol}</Td>
                <Td>{fill.side}</Td>
                <Td isNumeric>{fill.execPrice}</Td>
                <Td isNumeric>{fill.execQty}</Td>
                <Td isNumeric>{fill.execFee}</Td>
                <Td>{fill.execTime}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default Fills;
