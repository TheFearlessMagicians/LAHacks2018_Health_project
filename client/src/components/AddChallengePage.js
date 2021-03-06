import React from 'react';
import {connect} from 'react-redux';
import UserChallengeForm from './UserChallengeForm';
import {addChallenge} from '../actions/challenges';
import axios from 'axios';
const SERVERURL = "http://localhost:8000";
const AddChallengePage = (props) => {
    if(typeof props.player === 'undefined' || props.player.type !== 'user')
        return (
            <div>
                Access denied
            </div>
        );

    return (
  <div>

    <h1>Add a new Challenge</h1>
    <p> Click on one of your earlier challenges to edit. Note that you can't change the dates or cancel a challenge once already posted! </p>
    <UserChallengeForm
      onSubmit={(challenge) => {
        console.log('got challenge: ');
        console.log(challenge);
        // add new challenge to redux store.
        props.dispatch(addChallenge(challenge));
    props.history.push('/userDashboard'); // CLIENTSIDE REDIRECTION BY REACT ROUTER.
        /*axios.post(`${SERVERURL}/deploy`,{
            ...challenge,
            index:0
        },{
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response)=>{
            console.log(`response challengeId: ${response.data.address}`)
            challenge.challengeId = response.data.address;

            console.log('Posting successful')

            // I am redirecting to dashboard.
        }).catch((error)=>{
            console.log('AXIOS POSTING FAILED');
            console.log(error);
        })
*/

      }}
    />
  </div>);}

 const mapStateToProps= (state) => ({
     player:state.player

 })
export default connect(mapStateToProps)(AddChallengePage);
