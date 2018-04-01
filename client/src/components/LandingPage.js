import React from 'react';
import {Button, Icon, Input} from  'antd';
import {connect} from 'react-redux';
import {addUser,addBetter,removePlayer} from '../actions/player';
import TypeWriter from 'react-typewriter';
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

           <TypeWriter
                typing={1}
                fixed={true}>
           <h1>Start something, and do it.</h1></TypeWriter>
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


            <TypeWriter
                 typing={1}
                 fixed={true}
                 initDelay={500}
                 >
                <blockquote>
                    I want to lose 5 kg of fat by running in 5 months.
                    </blockquote>
                 </TypeWriter>
                 <TypeWriter
                      typing={1}
                      fixed={true}
                      initDelay={1000}
                     >
                         <blockquote>
                If I'm not ready for the Boston half-marathon in 6 months time I'm gonna pay $1000 for it. Fuck it.
                    </blockquote>
                 </TypeWriter>
                 <TypeWriter
                      typing={1}
                      fixed={true}
                      initDelay={2000}
                     >
                         <blockquote>
                    I want to run around Venice Beach 3 times a week.
                        </blockquote>
                 </TypeWriter>
    	</div>
        );
    }
}
export default connect()( LandingPage);
