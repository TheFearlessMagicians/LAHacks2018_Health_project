import React from 'react';
import { Modal, Button, Timeline, Icon, Input, notification } from 'antd';
import {List,Avatar} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


class MarketItemList extends React.Component{

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Bet Placed',
    description: 'You have placed a bet of ',
    duration: 3.0
  	});
  };

  handleOk = (e) => {
    this.openNotificationWithIcon('info');
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



  render() {
    return (
	<List.Item
    	actions= {[
        <p> End Date: :{moment(this.props.endDate).format('MM DD YYYY')}</p>,
        <Button type="primary" onClick={this.showModal}>Click for More Info</Button>
    	]}
    	>
      <List.Item.Meta
        avatar={<Icon type="line-chart" />}
        title={<p onClick={this.showModal}>{this.props.goal}</p>}
        description= {<p> User Bets: {this.props.userBet} </p>}
     />
     <Modal
          visible={this.state.visible}
          okText = "Make a bet"
          title = "Challenge Details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Description: {this.props.description}</p>
          <p>User's Bet: {this.props.userBet}</p>
          <h3>{moment(this.props.endDate).from(moment(this.props.startDate))}</h3>
          <div>
	          <Timeline>
			    <Timeline.Item>User started the challenge on {moment(this.props.startDate).format("MM DD YYYY")}</Timeline.Item>
			    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Challenge ends on {moment(this.props.endDate).format("MM DD YYYY")}</Timeline.Item>
			  </Timeline>
		  </div>
		  <Input type = "number" placeholder="Insert Your Bet" />

        </Modal>
    </List.Item>
    );
  }
}

export default MarketItemList;

// <div className = "market-item">
//       	<p className = "market-item__text">{this.props.description}</p>
