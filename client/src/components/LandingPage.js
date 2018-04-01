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
                    <h2> Start something, and do it. </h2>
                    </TypeWriter>
                    <TypeWriter typing={this.state.showNaySayer} fixed={true}>
                       <h2> Or, become a naysayer and bet that they won't.  </h2>
                       </TypeWriter>
                    <Input
                        className="container__landing__bar__input"
                        placeholder="What's your name?"
                        onChange={e => {
                            this.setState({ name: e.target.value });
                        }}
                    />
                    <Icon
                        type="line-chart"
                        style={{ fontSize: 16, color: "black" }}
                    />
                    <Button
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
                        Bet against
                    </Button>

                    <Icon
                        type="user-add"
                        style={{ fontSize: 16, color: "black" }}
                    />
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
                        start something new, and do it.
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
                    If I'm not ready for the Boston half-marathon in 6 months time I'm gonna pay $1000 for it. Fuck it.
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
