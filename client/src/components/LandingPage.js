import React from 'react';
import {Button, Icon} from  'antd';



const LandingPage = (props) => (
	<div className = "container__landing">
		<Icon type="line-chart" />
		<Button onClick= {(e) => {
			props.history.push('/BetterPage');
		}}>Better</Button>

		<Icon type="user-add" />
		<Button onClick= {(e) => {
			props.history.push('/UserPage');
		}}>User</Button>
	</div>
);

export default LandingPage;

