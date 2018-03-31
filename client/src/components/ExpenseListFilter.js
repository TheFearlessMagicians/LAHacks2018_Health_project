import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';

class ExpenseListFilter extends React.Component{
  state = {
    calendarFocused: null
  }
  // when airbnb range date picker is changed.
  // THE ARGUMENT IS AN OBJECT, SO WE GOTTA DESTRUCTURE IT!!!
  onDatesChange = ({startDate,endDate}) => {
  console.log('starts and ends:');
    console.log(startDate);
    console.log(endDate);
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };
  // when we focus on airbnb range date picker.
  onFocusChange=  (calendarFocused) => {
    this.setState({calendarFocused});
  }


  render(){
    return (
    // here we're creating controlled input. This is input where the value is 
    // controlled by javascript.
      <div>
        <h3> Search expenses: </h3>
        <input 
          type='text' 
          value={this.props.filter.text} 
          onChange= {(e) => {
          // we get a dispatch function prop passed in by Provider, which dispatches
          // an action object.
            this.props.dispatch(setTextFilter(e.target.value));
        }} />

      <h4> sort by: </h4>
      <select 
        value={this.props.filter.sortBy}
        onChange={(e) => {
          if(e.target.value === 'date')
              this.props.dispatch(sortByDate());
           else if (e.target.value === 'amount')
            this.props.dispatch(sortByAmount());

        }}
      >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filter.startDate}
          endDate = {this.props.filter.endDate}
          onDatesChange= {this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput= {this.state.calendarFocused}
          showClearDates={true}
          numberOfMonths = {1}
          isOutsideRange = {() => false }
          startDateId= {"start"}
          endDateId={"end"}
        />
      </div>
    );
  }
};


//set up value and onChange for select.
//
const mapStateToProps = (state)=> {
  return {
    filter: state.filter
  }
};
export default connect(mapStateToProps)(ExpenseListFilter);
