import React from 'react';
import {connect} from 'react-redux';
import UserChallengeForm from './UserChallengeForm';
import {addChallenge} from '../actions/challenges';
const AddChallengePage = (props) => {
    console.log('add challenge page player prop')
    console.log(props.player);
    if(typeof props.player === 'undefined' || props.player.type !== 'user')
        return (
            <div>
                Access denied
            </div>
        );

    return (
  <div>

    <h1>Add a new Challenge</h1>
    <UserChallengeForm
      onSubmit={(challenge) => {
        console.log('got challenge: ');
        console.log(challenge);
        // add new challenge to redux store.
        props.dispatch(addChallenge(challenge));
        props.history.push('/userDashboard'); // CLIENTSIDE REDIRECTION BY REACT ROUTER.
        // I am redirecting to dashboard.
      }}
    />
  </div>);}

 const mapStateToProps= (state) => ({
     player:state.player

 })
export default connect(mapStateToProps)(AddChallengePage);
