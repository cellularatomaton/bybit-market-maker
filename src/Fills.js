import React, { useContext } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import MarketContext from './MarketContext';

const Fills = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <TableContainer>
      <Table size='sm'>
        <TableCaption>Fills</TableCaption>
        <Thead>
          <Tr>
            <Th>category</Th>
            <Th>symbol</Th>
            <Th isNumeric>execFee</Th>
            <Th>execId</Th>
            <Th isNumeric>execPrice</Th>
            <Th isNumeric>execQty</Th>
            <Th>execType</Th>
            <Th isNumeric>execValue</Th>
            <Th>isMaker</Th>
            <Th isNumeric>feeRate</Th>
            <Th>orderId</Th>
            <Th>orderLinkId</Th>
            <Th isNumeric>orderPrice</Th>
            <Th isNumeric>orderQuantity</Th>
            <Th>orderType</Th>
            <Th>side</Th>
            <Th>execTime</Th>
          </Tr>
        </Thead>
        <Tbody>
        {marketState.Fills.map(fill => (
          <Tr>
            <Td>{fill.category}</Td>
            <Td>{fill.symbol}</Td>
            <Td isNumeric>{fill.execFee}</Td>
            <Td>{fill.execId}</Td>
            <Td isNumeric>{fill.execPrice}</Td>
            <Td isNumeric>{fill.execQty}</Td>
            <Td>{fill.execType}</Td>
            <Td isNumeric>{fill.execValue}</Td>
            <Td>{fill.isMaker}</Td>
            <Td isNumeric>{fill.feeRate}</Td>
            <Td>{fill.orderId}</Td>
            <Td>{fill.orderLinkId}</Td>
            <Td isNumeric>{fill.orderPrice}</Td>
            <Td isNumeric>{fill.orderQuantity}</Td>
            <Td>{fill.orderType}</Td>
            <Td>{fill.side}</Td>
            <Td>{fill.execTime}</Td>
          </Tr>
        ))}
        </Tbody>
        <Tfoot>
          <Tr>
              <Th>category</Th>
              <Th>symbol</Th>
              <Th isNumeric>execFee</Th>
              <Th>execId</Th>
              <Th isNumeric>execPrice</Th>
              <Th isNumeric>execQty</Th>
              <Th>execType</Th>
              <Th isNumeric>execValue</Th>
              <Th>isMaker</Th>
              <Th isNumeric>feeRate</Th>
              <Th>orderId</Th>
              <Th>orderLinkId</Th>
              <Th isNumeric>orderPrice</Th>
              <Th isNumeric>orderQuantity</Th>
              <Th>orderType</Th>
              <Th>side</Th>
              <Th>execTime</Th>
            </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Fills;
