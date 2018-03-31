import React from 'react';
import {List,Avatar} from 'antd';


const UserChallengesListItem2 = (props) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://cdn1.iconfinder.com/data/icons/resume-pictograms/100/Resume_Bulls-eye-128.png" />}
        title={<a href="https://ant.design">{props.goal}</a>}
        description={props.description}
      />

        <p> Bet: {props.userBet}</p>
        <p> startDate:{props.startDate}</p>
        <p> endDate: :{props.endDate}</p>
    </List.Item>
);

export default UserChallengesListItem2;
