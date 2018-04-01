import React from 'react';
import Header from '../components/Header';
import AddChallengePage from '../components/AddChallengePage';
import NotFoundPage from '../components/NotFoundPage';
import MarketDashboardPage from '../components/MarketDashboardPage';
import UserDashboardPage from '../components/UserDashboardPage';
// ^ ignore all this imports
import LandingPage from '../components/LandingPage';
import MarketDashBoardPage from '../components/MarketDashBoardPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//Header
// Pages.
const ErrorEdit = () => (<div> Error. ID not found. What item do you want to edit? </div>);
const AppRouter =()=> (
  <BrowserRouter>
    <div>
     <Header/>
      <Switch> {/* Switch goes thru our routes in order (top to bottom), and renders the first matching route.*/}
        <Route path="/" component={LandingPage} exact = {true}/> {
        // we have to specify exact = {true} because otherwise, React-router will
        // render all inexact (exact={false})  pages that match
        // with the path.
        // e..g if the above isn't exact, then when we go to /settings, then
        // the root and settings page will both be rendered. (which is sometimes
        // desirable, most times not.
        }
        <Route path="/marketDashboard" component = {MarketDashboardPage} exact={true} />
        <Route path="/userDashboard" component = {UserDashboardPage} exact={true} />
        <Route path="/createChallenge" component={AddChallengePage} />


        <Route component={NotFoundPage} />

      </Switch>
    </div>
  </BrowserRouter>
);
export default AppRouter;
