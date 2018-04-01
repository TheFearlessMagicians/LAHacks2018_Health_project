import React from 'react';
import {List,Avatar,Progress} from 'antd';
import moment from 'moment';

const UserChallengesListItem2 = (props) => (
    <List.Item
    actions= {[
        <p> Bet: {props.userBet}</p>,
        <p> startDate:{moment(props.startDate).format('MM DD YYYY')}</p>,
        <p> endDate: :{moment(props.endDate).format('MM DD YYYY')}</p>,
        <div>
            <h4> Workouts done: </h4>
            <Progress
                percent={Math.round((props.workoutsCompleted / (moment(props.startDate- props.endDate).format('DDD') / 7 ) * props.frequency) * 100)}
                status="active"
            />
        </div>,
        <div>
            <h4> Time till deadline: </h4>
            <Progress
                percent={moment() < moment(props.startDate)? 0: Math.round(100 * (moment() - moment(props.startDate) )/ (moment(props.endDate) - moment(props.startDate)))}
                status="active"
            />
        </div>
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
