import React from 'react';
import {connect} from 'react-redux';
import MarketListItem from './MarketListItem';



const MarketList = (props) => (
  <div className = "widget-heaader"> 
      <h1 className = "widget-header__title">Challanges to bet: </h1>
	  {props.challenges.map((challenge)=> (
	    <MarketListItem key= {challenge.challengeId} {...challenge}/> 
	  ))}
  </div>
);

const mapStateToProps = (state)=> ({
    challenges: state.challenges
});

const ConnectedMarketList = connect(mapStateToProps)(MarketList);



export default ConnectedMarketList;//MarketList;