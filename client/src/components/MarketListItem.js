import React from 'react';
import { Modal, Button, Timeline, Icon, Input, notification } from 'antd';
import {List,Avatar} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


class MarketListItem extends React.Component{


  state = {
      visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
      bet: 0
    });
  }

  openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Bet Placed',
    description: `You have placed a bet of ${this.state.bet}`,
    duration: 3.0
  	});
  };

  handleOk = (e) => {
    this.openNotificationWithIcon('info');
    //TODO: set state with bet.
    this.props.onPlacedBet(this.props.challengeId,this.state.bet);
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
        <p key="1"> End Date: :{moment(this.props.endDate).format('MMM DD YYYY')}</p>,
        <Button key="2" type="primary" onClick={this.showModal}>Click for More Info</Button>
    	]}
    	>
      <List.Item.Meta
        avatar={<Icon type="line-chart" />}
        title={<p onClick={this.showModal}>{this.props.goal}</p>}
        description= {[
            <p key="0">{this.props.description}</p>,
            <p key = "1"> User Bets: {this.props.userBet} </p>,
            <p key = "2"> total pot: {this.props.bets.length !== 0?
            this.props.bets.reduce((accumulator, bet)=> {
                return {money: Number(accumulator.money) + Number(bet.money)};
            }).money:
            0
            } </p>,
            <p key = "3">number of bets: {this.props.bets.length}</p>
        ]}
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
          <p> total pot: {this.props.bets.length !== 0?
          this.props.bets.reduce((accumulator, bet)=> {
              return {money: Number(accumulator.money) + Number(bet.money)};
          }).money:
          0
          } </p>
          <p>number of bets: {this.props.bets.length}</p>
          <h3>{moment(this.props.endDate).from(moment(this.props.startDate))}</h3>
          <div>
	          <Timeline>
			    <Timeline.Item>User started the challenge on {moment(this.props.startDate).format("MMM DD YYYY")}</Timeline.Item>
			    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Challenge ends on {moment(this.props.endDate).format("MMM DD YYYY")}</Timeline.Item>
			  </Timeline>
		  </div>
		  <Input
            type = "number"
            placeholder="Insert Your Bet"
            value={this.state.bet}
            onChange={(e)=>{
                this.setState({bet:e.target.value})
            }}/>

        </Modal>
    </List.Item>
    );
  }
}

export default MarketListItem;

// <div className = "market-item">
//       	<p className = "market-item__text">{this.props.description}</p>
