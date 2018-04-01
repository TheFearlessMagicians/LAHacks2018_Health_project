// we will create a stateless functional component to show all our
// expenses.
import React from 'react';
import {connect} from 'react-redux';
import UserChallengesListItem from './UserChallengesListItem';
import {List} from 'antd';
const ChallengesList = (props) => (
    <List
    itemLayout="horizontal"
    dataSource={props.currentChallenges}
    renderItem={challenge => (
          <UserChallengesListItem key= {challenge.challengeId} {...challenge}/>
    )}
  />

);


const mapStateToProps = (state)=> ({
    currentChallenges: state.player.currentChallenges,
});
// The object's key value pairs are then passed as props to the second
// argument, which is in here, ExpenseList.
const ConnectedChallengesList = connect(mapStateToProps)(ChallengesList);

export default ConnectedChallengesList;
