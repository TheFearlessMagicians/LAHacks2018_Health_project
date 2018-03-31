import React from 'react';
import {Button, Icon, Input} from  'antd';
import {connect} from 'react-redux';
import {addUser,addBetter} from '../actions/player';

class LandingPage extends React.Component {
    state = {
        name:''
    }
    render() {
        return (
    	<div className = "container__landing">
        <Input placeholder="What's your name?" onChange={(e)=>{
            this.setState({name: e.target.value});
        }} />
    		<Icon type="line-chart" />
    		<Button onClick= {(e) => {
                if (this.state.name=== '')
                    alert('put your name please!');
                else{
                    this.props.dispatch(addBetter({name:this.state.name}))
        			this.props.history.push('/MarketDashBoardPage');
                }
    		}}>Better</Button>

    		<Icon type="user-add" />
    		<Button onClick= {(e) => {
                if (this.state.name=== '')
                    alert('put your name please!');
                else{
                    this.props.dispatch(addUser({name:this.state.name}))
                    this.props.history.push('/UserPage');
                }

    		}}>User</Button>
    	</div>
        );
    }
}
export default connect()( LandingPage);
