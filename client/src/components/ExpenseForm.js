// we're creating a form for adding/editing an expense.
import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
// import airbnb react date's CSS.
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    description: props.existingExpense? props.existingExpense.description : '',
    note: props.existingExpense? props.existingExpense.note :'' ,
    createdAt: props.existingExpense? moment(props.existingExpense.createdAt) : moment(), // we use the unix timestamp
    calendarFocused: false,
    amount: props.existingExpense? props.existingExpense.amount.toString() : undefined,
    error: ''
  };
  }

  // Note that for our event handlers here, we dont put 
  // 'e.target.value' on the setState parameter, because
  // setState is asynchronous. So when it actually gets used,
  // e.target.value might be undefined, which is not good.
  // --- NOW --- if you'd like to do this, simply 'persist' the
  // event object by doing:
  /*
   *  e.persist();
   */
  onDescriptionChange = (e) =>{
    const description = e.target.value;
    this.setState({description});
  }

  onNoteChange = (e) =>{
    const note = e.target.value;
    this.setState({note});
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
      // Note that we're putting in !amount just incase
      // the user wants to delete the whole amount ting.
      // regex for matching number with at most
      // 2 decimal digits.
      this.setState({amount});
    else
      alert('enter a valid amount!');
  }

  onDateChange = (createdAt) => {
    if (createdAt){ // prevent user from clearing value.
    // this is because createdAt is defined only when you
    // pick a date.
      this.setState({createdAt});
      console.log('datechange: '+createdAt);
    }
  }
  onDateFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
    console.log('ondatefocuschange');
  
  }

  onSubmit = (e) => {
    e.preventDefault(); // we don't want browser to do full page refresh.
    if (typeof this.state.amount === 'undefined' 
      ||
      this.state.description === '')
      this.setState(() => ({error: 'Please provide description and amount.'}));
    else{
      console.log('submitted ok ');
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount,10), // parses string to real number
        createdAt: this.state.createdAt.valueOf(), // parse moment object to get timestamp -
        //unix time in millis
        note: this.state.note
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p> {this.state.error}</p>}
        <form 
        >
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value = {this.state.description}
            onChange = {this.onDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value = {this.state.amount}
            onChange ={this.onAmountChange}
          />
          <p> Date: </p>
          <SingleDatePicker
            date = {this.state.createdAt}
            onDateChange = {this.onDateChange}
            focused = {this.state.calendarFocused}
            onFocusChange = {this.onDateFocusChange}
            numberOfMonths = {1}
            isOutsideRange={(day) => {
              return false; // user should be able to pick
              // any day, even before the current day(today).
              // For airBNB, the function here would return true for any day
              // where it has already been booked !
              // But nothing is 'booked', so we can pick
              // any day we want.
            }}
          />
          <textarea
            placeholder="add a note for your expense (optional)"
            value = {this.state.note}
            onChange= {this.onNoteChange}
          >
          </textarea>
          <Button type="primary" onClick={this.onSubmit}> Submit </Button>
      </form>
      </div>
    );
  }
}
