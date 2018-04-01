// we will create a stateless functional component to show all our
// expenses.
import React from 'react';
import {connect} from 'react-redux';
import {finishedWorkout} from '../actions/challenges';
import UserChallengesListItem from './UserChallengesListItem';
import {List} from 'antd';

class  ChallengesList extends React.Component {
    onWorkedOut = (id,calories)=>{
        this.props.dispatch(finishedWorkout(id, calories));
    }
render(){
    return(
    <List
    itemLayout="horizontal"
    dataSource={this.props.currentChallenges}
    renderItem={challenge => (
          <UserChallengesListItem key= {challenge.challengeId} {...challenge} onWorkedOut={this.onWorkedOut}/>
    )}
  />

);}

}

const mapStateToProps = (state)=> ({
    currentChallenges: state.challenges // DEBUG//state.player.currentChallenges,
});
// The object's key value pairs are then passed as props to the second
// argument, which is in here, ExpenseList.
const ConnectedChallengesList = connect(mapStateToProps)(ChallengesList);

export default ConnectedChallengesList;
