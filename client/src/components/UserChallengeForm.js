// used for form.
// we're creating a form for adding/editing an expense.
import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
// import airbnb react date's CSS.
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
export default class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    startDate: props.existingChallenge? moment(props.existingChallenge.startDate) : null,//moment(),
    endDate: props.existingChallenge? moment(props.existingChallenge.endDate) : null,//moment(moment()+ 10000), // we use the unix timestamp
    goal: props.existingChallenge? props.existingChallenge.goal :'' ,
    description: props.existingChallenge? props.existingChallenge.description :'' ,
    userBet: props.existingChallenge? props.existingChallenge.userBet.toString() : undefined,
    frequency: props.existingChallenge? props.existingChallenge.frequency: undefined,
    error: '',
    calendarFocused: null,
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

  onGoalChange = (e) =>{
    const goal = e.target.value;
    this.setState({goal});
  }
  onFrequencyChange = (e) =>{
    const frequency = e.target.value;
    this.setState({frequency});
  }
  onuserBetChange = (e) => {
    const userBet = e.target.value;
    if(!userBet || userBet.match(/^\d{1,}(\.\d{0,2})?$/))
      // Note that we're putting in !userBet just incase
      // the user wants to delete the whole userBet ting.
      // regex for matching number with at most
      // 2 decimal digits.
      this.setState({userBet});
    else
      alert('enter a valid userBet!');
  }

  onDatesChange = ({startDate,endDate}) => {
      this.setState({startDate,endDate})
  console.log('starts and ends:');
    console.log(startDate);
    console.log(endDate);
    /*
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
    */
  };

  onDateFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
    console.log('ondatefocuschange');

  }

  onSubmit = (e) => {
    e.preventDefault(); // we don't want browser to do full page refresh.
    if (typeof this.state.userBet === 'undefined'
      ||
      this.state.description === ''
    ||
        this.state.goal ===''
    ||
        typeof this.state.frequency === 'undefined'
    ||
        this.state.startDate =='null'
    ||
        typeof this.state.endDate == 'null'
    )
      this.setState(() => ({error: 'Please provide description, goal ,frequency, and userBet.'}));
    else{
      console.log('submitted ok ');
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        userBet: parseFloat(this.state.userBet,10), // parses string to real number
        startDate: this.state.startDate.valueOf(), // parse moment object to get timestamp -
        endDate: this.state.endDate.valueOf(), // parse moment object to get timestamp -
        //unix time in millis
        goal: this.state.goal
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
            placeholder="Add your goal"
            autoFocus
            value = {this.state.goal}
            onChange = {this.onGoalChange}
          />
          <input
            type="number"
            placeholder="Place your bet here"
            value = {this.state.userBet}
            onChange ={this.onuserBetChange}
          />
          <p> Select your goal period. Remember, make sure that you goal is:: </p>
          <ul>
              <li>S: Specific</li>
              <li>M: Measurable</li>
              <li>A: Achievable</li>
              <li>R: Realistic</li>
              <li>T: Time-based</li>
          </ul>
          <input
            type="number"
            placeholder="How many times per week are you going to do this ting? "
            value = {this.state.frequency}
            onChange ={this.onFrequencyChange}
          />
          <DateRangePicker
            startDate={this.state.startDate}
            endDate = {this.state.endDate}
            onDatesChange= {this.onDatesChange}
            onFocusChange={this.onDateFocusChange}
            focusedInput= {this.state.calendarFocused}
            showClearDates={true}
            numberOfMonths = {1}
            isOutsideRange = {() => false }
            startDateId= {"start"}
            endDateId={"end"}
          />

          <textarea
            placeholder="add a Description for your Challenge "
            value = {this.state.description}
            onChange= {this.onDescriptionChange}
          >

          </textarea>
          <Button type="primary" onClick={this.onSubmit}> Submit </Button>
      </form>
      <div>
      {this.state.endDate == null || this.state.startDate == null?
          <p> Pick a date! </p>
          :
        <h1> {moment(this.state.endDate - this.state.startDate).format("DDD")} DAYS LEFT</h1>
    }
      </div>
      </div>
    );
  }
};
