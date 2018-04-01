// used for form.
// we're creating a form for adding/editing an expense.
import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
// import airbnb react date's CSS.
import "react-dates/lib/css/_datepicker.css";
import "antd/dist/antd.css";
import { Form,Button, Row, Col, Input, InputNumber, Alert } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;

export default class UserChallengeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.existingChallenge
        ? moment(props.existingChallenge.startDate)
        : null, //moment(),
      endDate: props.existingChallenge
        ? moment(props.existingChallenge.endDate)
        : null, //moment(moment()+ 10000), // we use the unix timestamp
      goal: props.existingChallenge ? props.existingChallenge.goal : "",
      description: props.existingChallenge
        ? props.existingChallenge.description
        : "",
      userBet: props.existingChallenge
        ? props.existingChallenge.userBet.toString()
        : 0,
      frequency: props.existingChallenge
        ? props.existingChallenge.frequency
        : undefined,
      error: "",
      calendarFocused: null
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
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState({ description });
  };

  onGoalChange = e => {
    const goal = e.target.value;

    this.setState({goal});
  }
  onFrequencyChange = (val) =>{
    const frequency = val;
    this.setState({frequency});
  }
  onuserBetChange = (val) => {
    const userBet =val;// e.target.value;


    this.setState({ userBet });
    //else
    // alert('enter a valid userBet!');
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    console.log("starts and ends:");
    console.log(startDate);
    console.log(endDate);
    /*
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
    */
  };

  onDateFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
    console.log("ondatefocuschange");
  };

  onSubmit = e => {
    e.preventDefault(); // we don't want browser to do full page refresh.
    if (
      typeof this.state.userBet === "undefined" ||
      this.state.description === "" ||
      this.state.goal === "" ||
      typeof this.state.frequency === "undefined" ||
      this.state.startDate == "null" ||
      typeof this.state.endDate == "null"
    )
      this.setState(() => ({
        error: "Please provide description, goal ,frequency, and userBet."
      }));
    else {
      console.log("submitted ok ");
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        userBet: parseFloat(this.state.userBet, 10), // parses string to real number
        startDate: this.state.startDate.valueOf(), // parse moment object to get timestamp -
        endDate: this.state.endDate.valueOf(), // parse moment object to get timestamp -
        //unix time in millis
        goal: this.state.goal
      });
    }
  };
  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div >
        {this.state.error && <center> {this.state.error}</center>}
        <Form onSubmit={this.onSubmit}>
           <FormItem
          {...formItemLayout}
          label="Goal"
           >
              <Input
                type="text"
                placeholder="Add your goal"
                autoFocus
                value={this.state.goal}
                onChange={this.onGoalChange}
              />
              <Alert
                message="Success Tips"
                description= {"Select your goal period. Remember,to make sure that you goal is" +
                             "S: Specific" + "\n" +
                             "M: Measurable" + "\n" +
                             "A: Achievable" + "\n" +
                             "R: Realistic" + "\n" +
                             "T: Time-based" + "\n"
               }
                type="info"
                showIcon
              />
          </FormItem>
          <FormItem
          {...formItemLayout}
          label="Bet"
          >
            <InputNumber
                size="large"
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder="Place your bet here"
                value={this.state.userBet}
                onChange={this.onuserBetChange}
            />
          </FormItem>
          <FormItem
          {...formItemLayout}
          label="Challenge Description"
          >
          <TextArea placeholder="Describe Your Challenge Here" autosize={{ minRows: 2, maxRows: 6 }} />
          </FormItem>
          <FormItem
          {...formItemLayout}
          label="Exercise How Frequently?"
          >
             <InputNumber
              size="large"
              value={this.state.frequency}
              onChange={this.onFrequencyChange}
            />
          </FormItem>

          <FormItem
          {...formItemLayout}
          label="Set Your TimeLine"
          >
            <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onDateFocusChange}
                focusedInput={this.state.calendarFocused}
                showClearDates={true}
                numberOfMonths={1}
                isOutsideRange={() => false}
                startDateId={"start"}
                endDateId={"end"}
            />
            <div>
              {this.state.endDate == null || this.state.startDate == null ? (
                <p> Pick a date! </p>
                ) : (
                <h1>
                  {" "}
                  {moment(this.state.endDate - this.state.startDate).format(
                    "DDD"
                  )}{" "}
                  DAYS LEFT
                </h1>
              )}
            </div>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button size= "large" type="primary" htmlType="submit">Register</Button>
        </FormItem>
        </Form>
      </div>
    );
  }
}
