import React from 'react';
import TextField from 'material-ui/TextField';
import NumberFormat from 'react-number-format';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import AddItem from '../../components/AddItem';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const CreateForm = props => (
  <div>
    <AddItem
      title="Add Expense"
      onClick={props.submitForm}
    >

    <form>
      <TextField
        label="Description"
        name="expenseDescription"
        type="text"
        value={props.expenseDescription}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* <p>Enter Expense</p> */}

      {/* <RadioGroup
        // aria-label="gender"
        name="gender1"
        // className={classes.group}
        value={"usd"}
        onClick={props.handleDivChange}
      >
        <FormControlLabel value={"usd"} control={<Radio />} label="USD" />
        <FormControlLabel value={"other"} control={<Radio />} label="OTHER" />
      </RadioGroup> */}
      
<p>Enter Expense</p>
      <label htmlFor="usd">
        <input
          type="radio"
          id="usd"
          name="selectCurrency"
          value={1}
          onClick={props.handleDivChange}
        />
        {props.currentUser ? props.currentUser.homeLocationCurrencyCode : 'usd'}
      </label>
      <label htmlFor="other">
        <input
          type="radio"
          id="other"
          name="selectCurrency"
          value={2}
          onClick={props.handleDivChange}
        />
        {props.currentUser ? props.currentUser.internLocationCurrencyCode : 'other'}
      </label>
      
      <br />
      <br />

      {(props.selectCurrency === 'usd') ? (
        <TextField
          label={props.homeLabel}
          name="usdAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={props.usdAmount}
          onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : (
        <TextField
          label={props.internLabel}
          name="locationAmount"
          type="number"
          placeholder="0"
          value={props.locationAmount}
          onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      <br />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={props.date}
        // placeholder={Date.now()}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      {/* <input name="date" type="date" value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} /> */}
      <NumberFormat
        label="Exchange Rate"
        name="exchangeRate"
        customInput={TextField}
        onValueChange={props.handleInputChangeForNumberFormatField}
        value={props.exchangeRate}
        type="tel"
        InputLabelProps={{ shrink: true }}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
      />

      <br />
      <br />
      {/* <Button variant="raised" onClick={props.submitForm} color="primary">
        Submit
      </Button> */}
    </form>
    </ AddItem >
  </div>
);

CreateForm.propTypes = {
  expenseDescription: PropTypes.string.isRequired,
  selectCurrency: PropTypes.string.isRequired,
  usdAmount: PropTypes.string.isRequired,
  locationAmount: PropTypes.string.isRequired,
  homeLabel: PropTypes.string.isRequired,
  internLabel: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  exchangeRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDivChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleInputChangeForNumberFormatField: PropTypes.func.isRequired,
};

export default CreateForm;
