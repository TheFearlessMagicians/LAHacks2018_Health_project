// we will create a stateless functional component to show all our
// expenses.
import React from 'react';
import {connect} from 'react-redux';
import {finishedWorkout, completedChallenge} from '../actions/challenges';
import UserChallengesListItem from './UserChallengesListItem';
import {getBetsWithChallengeId} from '../selectors/bets';
import {List} from 'antd';

class  ChallengesList extends React.Component {
    onWorkedOut = (id,calories)=>{
        this.props.dispatch(finishedWorkout(id, calories));
    }
    onCompletion = (id, exceedCalorieGoalBy)=>{
    	this.props.dispatch(completedChallenge(id, exceedCalorieGoalBy));
    }

render(){
    return(
    <List
    itemLayout="horizontal"
    dataSource={this.props.currentChallenges}
    renderItem={challenge => (
          <UserChallengesListItem key= {challenge.challengeId} bets={getBetsWithChallengeId(this.props.bets,challenge.challengeId)} {...challenge} onWorkedOut={this.onWorkedOut} onCompletion={this.onCompletion}/>
    )}
  />

);}

}

const mapStateToProps = (state)=> ({
    currentChallenges: state.challenges, // DEBUG//state.player.currentChallenges,
    bets:state.bets
});
// The object's key value pairs are then passed as props to the second
// argument, which is in here, ExpenseList.
const ConnectedChallengesList = connect(mapStateToProps)(ChallengesList);

export default ConnectedChallengesList;
