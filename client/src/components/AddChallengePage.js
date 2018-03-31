import React from 'react';
import {connect} from 'react-redux';
import UserchallengeForm from './UserChallengeForm';
import {addChallenge} from '../actions/challenges';
const AddChallengePage = (props) => (
  <div>

    <h1>Add a new Challenge</h1>
    <UserChallengeForm
      onSubmit={(challenge) => {
        console.log('got challenge: ');
        console.log(challenge);
        // add new challenge to redux store.
        props.dispatch(addChallenge(challenge));
        props.history.push('/'); // CLIENTSIDE REDIRECTION BY REACT ROUTER.
        // I am redirecting to dashboard.
      }}
    />
  </div>);
export default connect()(AddChallengePage);
