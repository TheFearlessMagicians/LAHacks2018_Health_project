import React from 'react';
import {List,Avatar,Progress} from 'antd';
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
      <h4> Workouts done: </h4>
      <Progress percent={(props.workoutsCompleted / (moment(props.startDate- props.endDate).format('DDD') / 7 ) * props.frequency) * 100} />
      <h4> Time till deadline: </h4>
      <Progress percent={100 * (moment() - moment(props.startDate) )/ (moment(props.endDate) - moment(props.startDate))} />
    </List.Item>
);

export default UserChallengesListItem2;
