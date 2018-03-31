import React from 'react';
import { Modal, Button, Timeline, Icon } from 'antd';


class MarketItemList extends React.Component{

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
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



        </Modal>
      </div>
    );
  }
}

export default MarketItemList;
