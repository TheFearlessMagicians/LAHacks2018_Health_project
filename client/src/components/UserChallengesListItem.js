import React from 'react';
import { Modal, Button, Icon, Input, notification, List, Avatar, Progress, InputNumber } from 'antd';
import moment from 'moment';
import getContract from '../blockchain/contract';
import web3 from '../blockchain/web3';
class UserChallengesListItem2 extends React.Component {
        state = {
            visible: false,
            caloriesPerWorkout: 0
        };

        showModal = () => {
            if (this.props.workoutsCompleted.length == this.getTotalExpectedworkouts())
                this.openNotificationWithIcon('warning', 'already completed!', 'this has already been completed!');
            else {
                this.setState({
                    visible: true
                });
            }
        }

        openNotificationWithIcon = (type, msg, description) => {
            notification[type]({
                message: msg,
                description: description,
                duration: 3.0
            });
        };

        handleOk = (e) => {

            if (this.props.workoutsCompleted.length + 1 === this.getTotalExpectedworkouts()) {
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                const totalWorkout = this.props.workoutsCompleted.reduce(reducer) + this.state.caloriesPerWorkout;
                const totalExpectedWorkout = this.props.caloriesPerWorkout * this.getTotalExpectedworkouts();
                const exceedCalorieGoalBy = totalWorkout - totalExpectedWorkout;
                this.props.onCompletion(this.props.challengeId, exceedCalorieGoalBy);

                if (exceedCalorieGoalBy >= 0) {
                    const totalBets = this.props.bets.length !== 0 ? this.props.bets.reduce(reducer) : 0;
                    const userBonus = totalBets * (1 / (1 + Math.pow(2.718281828459045, 1)) - 1);
                    const totalgains = this.props.userBet + userBonus;
                    this.openNotificationWithIcon('success', 'CONGRATULATIONS', `Challenge Complete! You have exceed your calories goal by ${exceedCalorieGoalBy} calories. We have deposited ${this.props.userBet} with a bonus of ${userBonus} for a total of ${totalgains}`);
                    //pay okay
                  

                  const process =  async () => {
                    const accounts = await web3.eth.getAccounts();
                    const account = accounts[0];
                    const exercise = getContract(this.props.challengeId);
                    const processReturn = (AccountsToEth) => {
                        let sum = 0;
                        let returnArray = [];
                        for (let i = 0; i < AccountsToEth.length; i++) {
                            sum += AccountsToEth[i][1];
                            returnArray.push([AccountsToEth[i][0]])
                        }
                        for (let i = 0; i < returnArray.length; i++) {
                            returnArray[i].push((AccountsToEth[i][1]) / sum);
                        }
                        return returnArray;
                    }
                    const n = await exercise.methods.workoutCount().call({
                      from: account
                    })

                    let raw = []
                    for (let i = 0; i < n; i++){
                      let bet = await exercise.methods.getBet(i).call({
                        from: account
                      })
                      Number(bet[0]);
                      raw.push(bet);
                    }

                    let data = processReturn(raw);

                    let workouts = await exercise.methods.workoutCount().call();

                    let frequency = await exercise.methods.frequency().call();

                    let balance = await exercise.methods.getBalance().call();

                    await exercise.methods.pay(accounts[0], balance * workouts / frequency).send({
                        from: account,
                        gas: 3000000
                    });

                    balance = await exercise.methods.getBalance().call();


                    for (let i = 0; i < data.length; i++) {
                        await exercise.methods.pay(data[i][0], balance * data[i][1]).send({
                            from: account,
                            gas: 3000000
                        });
                    }
                    balance = await exercise.methods.getBalance().call();
                  }

                  process();
                } else
                    this.openNotificationWithIcon('warning', 'Unfortunately...', `You lost the bet and will lose ${this.props.userBet}. You failed to meet your calories goal by ${Math.abs(exceedCalorieGoalBy)}.`);
                //  return;
            } else {
                if (this.props.caloriesPerWorkout <= this.state.caloriesPerWorkout)
                    this.openNotificationWithIcon('success', 'CONGRATULATIONS', `You have successfully burnt ${this.state.caloriesPerWorkout} calories`);
                else
                    this.openNotificationWithIcon('warning', 'Sorry...', `You burnt ${this.state.caloriesPerWorkout}, but it didn't cut your goal of ${this.props.caloriesPerWorkout} calories... Work harder next time!`);
            }

            this.props.onWorkedOut(this.props.challengeId, this.state.caloriesPerWorkout);

            //NOTE: POST TO
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
        //helper function to get total number of expected workouts.
        getTotalExpectedworkouts = () => {
            return Math.ceil((moment(this.props.endDate).diff(moment(this.props.startDate), 'days') / 7) * this.props.frequency)
        }
        getTimePercentage = () => {
            return Math.ceil(100 * (moment().diff(moment(this.props.startDate), 'days') / moment(this.props.endDate).diff(moment(this.props.startDate), 'days')))
        }
        render() {
            return ( <
                List.Item className = { this.props.workoutsCompleted.length == this.getTotalExpectedworkouts() ? "userChallengeListItem__completed" : undefined } actions = {
                    [ <
                        p > Bet: { this.props.userBet } < /p> , <
                        p > startDate: { moment(this.props.startDate).format('MM DD YYYY') } < /p>, <
                        p > endDate:: { moment(this.props.endDate).format('MM DD YYYY') } < /p>, <
                        p > frequency per week: { this.props.frequency } < /p>, <
                        div >
                        <
                        h4 > Workouts done: < /h4>

                        <
                        Progress

                        percent = { Math.ceil((this.props.workoutsCompleted.length / this.getTotalExpectedworkouts()) * 100) }
                        status = { this.props.workoutsCompleted.length == this.getTotalExpectedworkouts() ? "success" : "active" }
                        />

                        <
                        /div>, <
                        div >
                        <
                        h4 > Time till deadline: < /h4> <
                        Progress

                        percent = { moment() < moment(this.props.startDate) ? 0 : this.getTimePercentage() }

                        status = "active" /
                        >

                        <
                        /div>
                    ]
                } >
                <
                List.Item.Meta avatar = { < Avatar src = "https://cdn1.iconfinder.com/data/icons/resume-pictograms/100/Resume_Bulls-eye-128.png" / > } title = { < a onClick = { this.showModal } > { this.props.goal } < /a>}
                    description = { this.props.description }
                    />

                    <
                    Modal
                    visible = { this.state.visible }
                    okText = "Enter Your Workout Here"
                    title = "Workout Log"
                    onOk = { this.handleOk }
                    onCancel = { this.handleCancel } >
                    {
                        moment(this.props.startDate) > moment() ?
                        <
                        h3 > This challenge hasn 't started yet </h3> :
                            <
                            h3 > DEADLINE: { moment(this.props.endDate).from(moment()) } < /h3>
                    } <
                    h4 > Workouts done: < /h4> <
                        h4 > { this.props.workoutsCompleted.length }
                    / { this.getTotalExpectedworkouts()} workouts <
                    /h4> <
                    Progress
                    percent = { Math.ceil((this.props.workoutsCompleted.length / this.getTotalExpectedworkouts()) * 100) }
                    status = "active" / >
                    <
                    h4 > Time till deadline: < /h4> <
                        Progress
                    percent = { moment() < moment(this.props.startDate) ? 0 : this.getTimePercentage() }
                    status = { this.props.workoutsCompleted.length == this.getTotalExpectedworkouts() ? "success" : "active" }
                    /> <
                    h4 > Enter number of calories spent: < /h4> <
                        InputNumber placeholder = "Insert How Many Calories You Learn Today"
                    onChange = {
                        (caloriesPerWorkout) => this.setState({ caloriesPerWorkout }) }
                    value = { this.state.caloriesPerWorkout }
                    />

                    <
                    /Modal> <
                    /List.Item>
                )
            }
        };

        export default UserChallengesListItem2;