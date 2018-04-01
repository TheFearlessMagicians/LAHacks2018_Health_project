import React from "react";
import { Button, Icon, Input } from "antd";
import { connect } from "react-redux";
import { addUser, addBetter, removePlayer } from "../actions/player";

class LandingPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(removePlayer());
    }
    state = {
        name: ""
    };
    render() {
        return (
            <div className="container__landing ">
                <div className ="container__landing__bar">
                    <h2> Start something, and do it. </h2>
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
                        Better
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
                        User
                    </Button>
                </div>
            </div>
        );
    }
}
export default connect()(LandingPage);
