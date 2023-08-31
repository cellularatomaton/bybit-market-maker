import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
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

const Orders = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <Card w='100%' h='100%'>
      <CardHeader>
        <Heading size='md'>Orders</Heading>
      </CardHeader>
      <CardBody overflow="auto">
        <TableContainer >
          <Table size='sm'>
          <Thead>
            <Tr>
              <Th>category</Th>
              <Th>symbol</Th>
              <Th>side</Th>
              <Th>orderType</Th>
              <Th isNumeric>price</Th>
              <Th isNumeric>qty</Th>
              <Th>timeInForce</Th>
              <Th>orderStatus</Th>
              <Th isNumeric>cumExecQty</Th>
              <Th isNumeric>cumExecValue</Th>
              <Th isNumeric>cumExecFee</Th>
              <Th>createdTime</Th>
            </Tr>
          </Thead>
          <Tbody>
          {marketState.orders.map(order => (
            <Tr 
              key={order.orderId}
              color={
                order.side==='Buy' ? 
                'var(--chakra-colors-blue-400)' :
                'var(--chakra-colors-red-400)'
              }
            >
              <Td>{order.category}</Td>
              <Td>{order.symbol}</Td>
              <Td>{order.side}</Td>
              <Td>{order.orderType}</Td>
              <Td isNumeric>{order.price}</Td>
              <Td isNumeric>{order.qty}</Td>
              <Td>{order.timeInForce}</Td>
              <Td>{order.orderStatus}</Td>
              <Td isNumeric>{order.cumExecQty}</Td>
              <Td isNumeric>{order.cumExecValue}</Td>
              <Td isNumeric>{order.cumExecFee}</Td>
              <Td>{order.createdTime}</Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default Orders;
