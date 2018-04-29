import React from 'react';
import Table, { TableBody, TableHead, TableCell, TableRow } from 'material-ui/Table';
import Card from 'material-ui/Card';
import ExpenseLedgerItem from './ExpenseLedgerItem';

const Ledger = props => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Amount USD</TableCell>
        <TableCell>Amount XXX</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense} />)}
    </TableBody>
  </Table>
);

export default Ledger;
