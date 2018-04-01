import React from 'react';
import {Modal, Button, Icon, Input, notification, List, Avatar, Progress ,InputNumber} from 'antd';
import moment from 'moment';

class UserChallengesListItem2 extends React.Component{
  state = {
      visible: false,
      caloriesPerWorkout:0
   };

  showModal = () => {
      if( this.props.workoutsCompleted.length == this.getTotalExpectedworkouts())
        this.openNotificationWithIcon('warning','already completed!','this has already been completed!');
    else{
     this.setState({
      visible: true
    });
    }
  }

  openNotificationWithIcon = (type,msg,description) => {
  notification[type]({
    message: msg,
    description:description,
    duration: 3.0
    });
  };

  handleOk = (e) => {


     this.props.onWorkedOut(this.props.challengeId, this.state.caloriesPerWorkout);
     if(this.props.caloriesPerWorkout <= this.state.caloriesPerWorkout)
        this.openNotificationWithIcon('success','CONGRATULATIONS', `You have successfully burnt ${this.state.caloriesPerWorkout} calories`);
    else
        this.openNotificationWithIcon('warning','Sorry...',`You burnt ${this.state.caloriesPerWorkout}, but it didn't cut your goal of ${this.props.caloriesPerWorkout} calories... Work harder next time!`);

    //NOTE: POST TO

    this.setState({
      visible: false,

    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  //helper function to get total number of expected workouts.
  getTotalExpectedworkouts = () => {
      return Math.ceil((moment( this.props.endDate).diff(moment( this.props.startDate),'days') / 7 ) * this.props.frequency)
  }
  getTimePercentage = () => {
      return Math.ceil(100 * (moment().diff (moment(this.props.startDate),'days') / moment(this.props.endDate).diff(moment(this.props.startDate),'days')))
  }
render(){
  return(
    <List.Item
    className={this.props.workoutsCompleted.length == this.getTotalExpectedworkouts() ?"userChallengeListItem__completed":undefined}
    actions= {[
        <p> Bet: {this.props.userBet} </p> ,
        <p> startDate:{moment(this.props.startDate).format('MM DD YYYY')}</p>,
        <p> endDate: :{moment(this.props.endDate).format('MM DD YYYY')}</p>,
        <p> frequency per week: {this.props.frequency}</p>,
        <div>
            <h4> Workouts done: </h4>

            <Progress

             percent={Math.ceil((this.props.workoutsCompleted.length / this.getTotalExpectedworkouts()) * 100)}
                  status={this.props.workoutsCompleted.length == this.getTotalExpectedworkouts()? "success":"active"}/>

        </div>,
        <div>
            <h4> Time till deadline: </h4>
            <Progress

                percent={moment() < moment(this.props.startDate)? 0:this.getTimePercentage()}

                status="active"
            />

        </div>
    ]}
    >
      <List.Item.Meta
        avatar={<Avatar src="https://cdn1.iconfinder.com/data/icons/resume-pictograms/100/Resume_Bulls-eye-128.png" />}
        title={<a onClick={this.showModal}>{this.props.goal}</a>}
        description={this.props.description}
      />

      <Modal
          visible={this.state.visible}
          okText = "Enter Your Workout Here"
          title = "Workout Log"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        {moment(this.props.startDate) > moment()?
            <h3> This challenge hasn't started yet </h3>
            :
         <h3>DEADLINE: {moment(this.props.endDate).from(moment())}</h3>
             }
         <h4> Workouts done: </h4>
         <h4>
            {this.props.workoutsCompleted.length} / { this.getTotalExpectedworkouts()} workouts
            </h4>
            <Progress
             percent={Math.ceil((this.props.workoutsCompleted.length / this.getTotalExpectedworkouts()) * 100)}
             status="active"/>
        <h4> Time till deadline: </h4>
            <Progress
              percent={moment() < moment(this.props.startDate)? 0: this.getTimePercentage()}
                 status={this.props.workoutsCompleted.length == this.getTotalExpectedworkouts()? "success":"active"}
                />
         <h4> Enter number of calories spent: </h4>
      <InputNumber  placeholder="Insert How Many Calories You Learn Today"
      onChange={(caloriesPerWorkout)=> this.setState({caloriesPerWorkout})}
      value={this.state.caloriesPerWorkout}/>

        </Modal>
    </List.Item>
  )}};

export default UserChallengesListItem2;
