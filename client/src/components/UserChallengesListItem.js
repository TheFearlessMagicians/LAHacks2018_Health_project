import React from 'react';
import {List,Avatar} from 'antd';
import moment from 'moment';

const UserChallengesListItem2 = (props) => (
    <List.Item
    actions= {[
        <p> Bet: {props.userBet}</p>,
        <p> startDate:{moment(props.startDate).format('MM DD YYYY')}</p>,
        <p> endDate: :{moment(props.endDate).format('MM DD YYYY')}</p>
    ]}
    >
      <List.Item.Meta
        avatar={<Avatar src="https://cdn1.iconfinder.com/data/icons/resume-pictograms/100/Resume_Bulls-eye-128.png" />}
        title={<a href="https://ant.design">{props.goal}</a>}
        description={props.description}
      />


    </List.Item>
);

export default UserChallengesListItem2;
