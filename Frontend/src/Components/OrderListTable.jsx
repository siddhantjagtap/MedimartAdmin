import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import listData from './orderListData';

const StyledTable = styled(DataTable)`
  .rdt_TableHeadRow {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .rdt_TableRow:nth-child(even) {
    background-color: #f9f9f9;
  }

  .rdt_TableCell {
    padding: 12px;
  }
`;

const columns = [
  { name: "Order ID", selector: row => row.orderid },
  { name: "Email", selector: row => row.email },
  { name: "Order Cost", selector: row => row.cost },
  { name: "Payment Status", selector: row => row.status },
  { name: "Customer ID", selector: row => row.customerid },
  { name: "Transaction ID", selector: row => row.transactionid },
  { name: "Product ID", selector: row => row.productid },
  { name: "Quantity", selector: row => row.quantity },
  { name: "Actions", selector: row => <button>View</button> },
];

const OrderList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(listData);
  }, []);

  return (
    <div className='px-10'>
      <div>
        <h3 className="text-3xl font-bold py-8">Dashboard/Order List</h3>
      </div>
      <StyledTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default OrderList;