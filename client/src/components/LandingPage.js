import React from 'react';
import {Button, Icon, Input} from  'antd';
import {connect} from 'react-redux';
import {addUser,addBetter,removePlayer} from '../actions/player';

class LandingPage extends React.Component {
    componentDidMount(){
        this.props.dispatch(removePlayer());
    }
    state = {
        name:''
    }
    render() {

        return (
    	<div className = "container__landing ">
        <h2> Start something, and do it. </h2>
        <Input placeholder="What's your name?" onChange={(e)=>{
            this.setState({name: e.target.value});
        }} />
    		<Icon type="line-chart" />
    		<Button onClick= {(e) => {
                if (this.state.name=== '')
                    alert('put your name please!');
                else{
                    this.props.dispatch(addBetter({name:this.state.name}))
        			this.props.history.push('/marketDashboard');
                }
    		}}>Better</Button>

    		<Icon type="user-add" />
    		<Button onClick= {(e) => {
                if (this.state.name=== '')
                    alert('put your name please!');
                else{
                    this.props.dispatch(addUser({name:this.state.name}))
                    this.props.history.push('/userDashboard');
                }

    		}}>User</Button>
    	</div>
        );
    }
}
export default connect()( LandingPage);
