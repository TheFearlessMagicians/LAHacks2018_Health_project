import React from 'react';
import {Modal, Button, Icon, Input, notification, List, Avatar, Progress } from 'antd';
import moment from 'moment';

class UserChallengesListItem2 extends React.Component{ 
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'CONGRATULATIONS',
    description: 'You have successfully burnt {this.props.} ',
    duration: 3.0
    });
  };

  handleOk = (e) => {
    this.openNotificationWithIcon('success');
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

render(){
  return(
    <List.Item
    actions= {[
        <p> Bet: {this.props.userBet} </p> ,
        <p> startDate:{moment(this.props.startDate).format('MM DD YYYY')}</p>,
        <p> endDate: :{moment(this.props.endDate).format('MM DD YYYY')}</p>,
        <div>
            <h4> Workouts done: </h4>

            <Progress
                percent={Math.round((this.props.workoutsCompleted / (moment(this.props.startDate- this.props.endDate).format('DDD') / 7 ) * this.props.frequency) * 100)}
                status="active"
            />
        </div>,
        <div>
            <h4> Time till deadline: </h4>
            <Progress
                percent={moment() < moment(this.props.startDate)? 0: Math.round(100 * (moment() - moment(this.props.startDate) )/ (moment(this.props.endDate) - moment(this.props.startDate)))}
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
          okText = "Enter Your WorkOut Here"
          title = "Workout Log"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <h3>YOU HAVE {moment(this.props.endDate - this.props.startDate).format("DDD")} DAYS LEFT</h3>
         <h4> Workouts done: </h4>
         <Progress 
          percent={Math.round((this.props.workoutsCompleted / (moment(this.props.startDate- this.props.endDate).format('DDD') / 7 ) * this.props.frequency) * 100)} 
          status="active"/>
        <h4> Time till deadline: </h4>
            <Progress 
              percent={moment() < moment(this.props.startDate)? 0: Math.round(100 * (moment() - moment(this.props.startDate) )/ (moment(this.props.endDate) - moment(this.props.startDate)))} 
              status="active"/>
      <Input type = "number" placeholder="Insert How Many Calories You Learn Today" />

        </Modal>
    </List.Item>
  )}};

export default UserChallengesListItem2;
