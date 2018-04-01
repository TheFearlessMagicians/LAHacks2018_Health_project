import React from 'react';
import {Button, Icon, Input} from  'antd';
import {connect} from 'react-redux';
import {addUser,addBetter,removePlayer} from '../actions/player';
import TypeWriter from 'react-typewriter';
class LandingPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(removePlayer());
            window.setTimeout(()=>{this.setState({showNaySayer:1})},8000);
    }
    state = {
        name: "",
        showNaySayer:0
    };
    render() {

        return (
            <div className="container__landing ">
                <div className ="container__landing__bar">
                 <TypeWriter typing={1} fixed={true}>
                    <h1 className = "container__landing__title"> Start something, and  do it.</h1>
                    </TypeWriter>
                    <TypeWriter typing={this.state.showNaySayer} fixed={true}>
                       <h2 className = "container__landing__subtitle" > Or, become a naysayer and bet that they won't.  </h2>
                       </TypeWriter>
                    <Input
                        className="container__landing__bar__input"
                        placeholder="What's your name?"
                        onChange={e => {
                            this.setState({ name: e.target.value });
                        }}
                    />

                    <Button
                        className = "container__landing__bar__button"
                        onClick={e => {
                            if (this.state.name === "")
                                alert("put your name please!");
                            else {
                                this.props.dispatch(
                                    addBetter({ name: this.state.name })
                                );
                                this.props.history.push("/marketDashboard");
                            }
                        }}
                    >
                        <Icon
                            type="line-chart"
                            style={{ fontSize: 16, color: "black" }}
                        />

                        Bet against
                    </Button>


                    <Button
                        onClick={e => {
                            if (this.state.name === "")
                                alert("put your name please!");
                            else {
                                this.props.dispatch(
                                    addUser({ name: this.state.name })
                                );
                                this.props.history.push("/userDashboard");
                            }
                        }}
                    >
                        <Icon
                            type="user-add"
                            style={{ fontSize: 16, color: "black" }}
                        />
                        Start something new, and do it.
                    </Button>
                </div>
                <TypeWriter
                     typing={this.state.showNaySayer ==1? -1 :1}
                     fixed={true}
                     >
                    <blockquote>
                        I want to lose 5 kg of fat by running in 5 months.
                        </blockquote>
                     </TypeWriter>
                     <TypeWriter
                          typing={this.state.showNaySayer ==1? -1 :1}
                          fixed={true}
                         >
                             <blockquote styles = {{'max-width': '40%' }}>
                    Gonna be ready for the Boston half-marathon in 6 months, otherwise I've to pay $1000.
                        </blockquote>
                     </TypeWriter>
                     <TypeWriter
                          typing={this.state.showNaySayer ==1? -1 :1}
                          fixed={true}
                         >
                             <blockquote>
                        I want to run around Venice Beach 3 times a week.
                            </blockquote>
                     </TypeWriter>
            </div>
        );
    }
}
export default connect()(LandingPage);
