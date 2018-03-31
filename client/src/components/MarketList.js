import React from 'react';
import {connect} from 'react-redux';
import MarketListItem from './MarketListItem'


const MarketList = (props) => (
  <div> 
    <h1>Challanges to bet: </h1>
    <ul>
      {props.challenges.map((challenge)=> (
        <MarketListItem key= {challenge.challengeId} {...challenge}/> 
         <li key = {expense.id}> {expense.description}: ${expense.amount / 100}</li>
      ))}
  </ul>
  </div>
);

const mapStateToProps = (state)=> ({
    challenges: state.challenges
});

const ConnectedMarketList = connect(mapStateToProps)(MarketList);




export default MarketList;