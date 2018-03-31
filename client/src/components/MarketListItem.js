import React from 'react';
import { Modal, Button, Timeline, Icon, Input, notification } from 'antd';


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
      <div>
      	<p>{this.props.description}</p>

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
          <div>
	          <Timeline>
			    <Timeline.Item>User started the challenge on {this.props.startDate}</Timeline.Item>
			    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Challenge ends on {this.props.endDate}</Timeline.Item>
			  </Timeline>
		  </div>
		  <Input type = "number" placeholder="Insert Your Bet" />

        </Modal>


      </div>
    );
  }
}

export default MarketItemList;
