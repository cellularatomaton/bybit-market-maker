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

const Orders = () => {
  const { marketState } = useContext(MarketContext);
  return (
    <TableContainer>
      <Table size='sm'>
        <TableCaption>Fills</TableCaption>
        <Thead>
          <Tr>
            <Th>symbol</Th>
            <Th>orderId</Th>
            <Th>side</Th>
            <Th>orderType</Th>
            <Th>cancelType</Th>
            <Th isNumeric>price</Th>
            <Th isNumeric>qty</Th>
            <Th>timeInForce</Th>
            <Th>orderStatus</Th>
            <Th>orderLinkId</Th>
            <Th isNumeric>cumExecQty</Th>
            <Th isNumeric>cumExecValue</Th>
            <Th isNumeric>avgPrice</Th>
            <Th isNumeric>cumExecFee</Th>
            <Th>createdTime</Th>
            <Th>updatedTime</Th>
            <Th>rejectReason</Th>
            <Th>category</Th>
            <Th>placeType</Th>
            <Th>smpType</Th>
          </Tr>
        </Thead>
        <Tbody>
        {marketState.Orders.map(order => (
          <Tr>
            <Td>{order.symbol}</Td>
            <Td>{order.orderId}</Td>
            <Td>{order.side}</Td>
            <Td>{order.orderType}</Td>
            <Td>{order.cancelType}</Td>
            <Td isNumeric>{order.price}</Td>
            <Td isNumeric>{order.qty}</Td>
            <Td>{order.timeInForce}</Td>
            <Td>{order.orderStatus}</Td>
            <Td>{order.orderLinkId}</Td>
            <Td isNumeric>{order.cumExecQty}</Td>
            <Td isNumeric>{order.cumExecValue}</Td>
            <Td isNumeric>{order.avgPrice}</Td>
            <Td isNumeric>{order.cumExecFee}</Td>
            <Td>{order.createdTime}</Td>
            <Td>{order.updatedTime}</Td>
            <Td>{order.rejectReason}</Td>
            <Td>{order.category}</Td>
            <Td>{order.placeType}</Td>
            <Td>{order.smpType}</Td>
          </Tr>
        ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>symbol</Th>
            <Th>orderId</Th>
            <Th>side</Th>
            <Th>orderType</Th>
            <Th>cancelType</Th>
            <Th isNumeric>price</Th>
            <Th isNumeric>qty</Th>
            <Th>timeInForce</Th>
            <Th>orderStatus</Th>
            <Th>orderLinkId</Th>
            <Th isNumeric>cumExecQty</Th>
            <Th isNumeric>cumExecValue</Th>
            <Th isNumeric>avgPrice</Th>
            <Th isNumeric>cumExecFee</Th>
            <Th>createdTime</Th>
            <Th>updatedTime</Th>
            <Th>rejectReason</Th>
            <Th>category</Th>
            <Th>placeType</Th>
            <Th>smpType</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Orders;
