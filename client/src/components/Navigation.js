import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const Navigation = (props) => {
    if( typeof props.player === 'undefined')
        return (  <NavLink to="/" activeClassName="is-active" exact = {true}>login</NavLink>);
    return (
        <div>
            {props.player.type === 'user' && (
            <div>
            <NavLink to="/userDashboard" activeClassName="is-active" exact = {true}> My Challenges </NavLink>
            <NavLink to="/createChallenge" activeClassName="is-active" exact = {true}>New Challenge</NavLink>
              <NavLink to="/" activeClassName="is-active" exact = {true}>logout</NavLink>
            </div>)
            }
            {props.player.type === 'better' &&(
                <div>
                <NavLink to="/marketDashboard" activeClassName="is-active" exact = {true}> Market </NavLink>
              <NavLink to="/" activeClassName="is-active" exact = {true}>logout</NavLink>
              </div>
                )
            }

         </div>
  );
  };
/*

class Navigation extends React.Component {
    render(){
        return (
    <div> navigation here</div>
);}
}*/
const mapStateToProps = (state) =>({
    player: state.player
});
//export default Navigation;
export default connect(mapStateToProps)(Navigation);
