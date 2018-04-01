import React from 'react';
import { Modal, Button, Timeline, Icon, Input, notification } from 'antd';
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
      <div className = "market-item">
      	<p className = "market-item__text">{this.props.description}</p>
        <Button type="primary" onClick={this.showModal}>Click for More Info</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          okText = "Make a bet"
          title = "Challenge Details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Description: {this.props.reward}</p>
          <p>User's Bet: {this.props.userBet}</p>
          <h3>{moment(this.props.endDate - this.props.startDate).format("DDD")} DAYS LEFT</h3>
          <div>
	          <Timeline>
			    <Timeline.Item>User started the challenge on {moment(this.props.startDate).format("DDD")}</Timeline.Item>
			    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Challenge ends on {moment(this.props.endDate).format("DDD")}</Timeline.Item>
			  </Timeline>
		  </div>
		  <Input type = "number" placeholder="Insert Your Bet" />

        </Modal>


      </div>
    );
  }
}

export default MarketItemList;
