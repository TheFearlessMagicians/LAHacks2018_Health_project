import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout, Menu} from 'antd';

const NavigationLinks = (props) => {
    if( typeof props.player === 'undefined' || props.player.type == '')
        return (
        <Menu
            theme="dark"
            mode="horizontal"
              style={{ lineHeight: '64px' }}

              >
            <Menu.Item key ="1">
                <NavLink to="/" activeClassName="is-active" exact = {true}>login</NavLink>
            </Menu.Item>
        </Menu>
        );
    if (props.player.type ==='user')
    return (
        <Menu
            theme="dark"
            mode="horizontal"
              style={{ lineHeight: '64px' }}
              >
                <Menu.Item key ="2">
            <NavLink to="/userDashboard" activeClassName="is-active" exact = {true}> My Challenges </NavLink>
                </Menu.Item>
                <Menu.Item key ="3">
            <NavLink to="/createChallenge" activeClassName="is-active" exact = {true}>New Challenge</NavLink>
                </Menu.Item>
                    <Menu.Item key ="1">
              <NavLink to="/" activeClassName="is-active" exact = {true}>logout</NavLink>
                  </Menu.Item>
            </Menu>
        );
    if(props.player.type ==='better')
        return(
            <Menu
                theme="dark"
                mode="horizontal"
                  style={{ lineHeight: '64px' }}

                  >
            <Menu.Item key ="2">
        <NavLink to="/marketDashboard" activeClassName="is-active" exact = {true}> Market </NavLink>
            </Menu.Item>
            <Menu.Item key ="1">
      <NavLink to="/" activeClassName="is-active" exact = {true}>logout</NavLink>
          </Menu.Item>
          </Menu>
        )



  };
const Navigation = (props)=> {
    return (
        <Layout>
        <NavigationLinks player={props.player}/>
        </Layout>
    );
}
const mapStateToProps = (state) =>({
    player: state.player
});
//export default Navigation;
export default connect(mapStateToProps)(Navigation);
