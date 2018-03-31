import React from 'react';
import {connect} from 'react-redux'; // we use the 'connect' function
import UserChallengesList from './UserChallengesList';
// for all downstream components.
class  UserDashboardPage extends React.Component {
    render(){
        if( this.props.player.type !== 'user')
            return (
                <div>
                    Access denied
                </div>
            );

        return (
          <div>
            <h1>{this.props.player.name}'s' dashboard page</h1>
            <UserChallengesList/>
          </div>

    );
}
}
const mapStateToProps = (state) =>({
    player: state.player
});
export default connect(mapStateToProps)(UserDashboardPage);
