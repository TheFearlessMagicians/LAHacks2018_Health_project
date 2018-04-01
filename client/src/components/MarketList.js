import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd';
import MarketListItem from './MarketListItem';
import {addBet} from '../actions/bets';
import {getBetsWithChallengeId} from '../selectors/bets';
const MarketList = (props) => (
    <List
    itemLayout="horizontal"
    dataSource={props.challenges}
    renderItem={challenge => (
          <MarketListItem
            key= {challenge.challengeId}
            bets={getBetsWithChallengeId(props.bets,challenge.challengeId)}
            {...challenge}
            onPlacedBet ={
              (challengeId,money) => {
                  console.log('onplacedbethere');
                      props.dispatch(addBet({challengeId, money, betterId:props.betterId,isFor:false }));
                 }
          } />
    )}
  />

);

// const MarketList = (props) => (
//   <div className = "widget-heaader">
//       <h1 className = "widget-header__title">Challanges to bet: </h1>
// 	  {props.challenges.map((challenge)=> (
// 	    <MarketListItem key= {challenge.challengeId} {...challenge}/>
// 	  ))}
//   </div>
// );

const mapStateToProps = (state)=> ({
    challenges: state.challenges,
    bets:state.bets,
    player:state.player
});

const ConnectedMarketList = connect(mapStateToProps)(MarketList);



export default ConnectedMarketList;//MarketList;
