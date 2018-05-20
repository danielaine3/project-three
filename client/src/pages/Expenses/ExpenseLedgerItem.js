import React from 'react';
import { TableRow, TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const ExpenseLedgerItem = props => (
  <TableRow className={props.classes.row} id={props.id}>
    <CustomTableCell>{props.expDate.slice(0, 10)}</CustomTableCell>
    <CustomTableCell>{props.expDesc}</CustomTableCell>
    <CustomTableCell>{props.expCategory}</CustomTableCell>
    <CustomTableCell numeric style={{ maxWidth: 5}}>
      <span className="currencySymbol" style={{ float: 'left'}}>$</span>
      <span className="usdCurrency" style={{ maxWidth: 2}}>{props.expAmount.toFixed(2)}</span>
    </CustomTableCell>
    <CustomTableCell numeric>{props.expAmountLocalCurrency.toFixed(2)}</CustomTableCell>
  </TableRow>

);

export default ExpenseLedgerItem;
