import React from 'react';
import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//Header
// Pages.
const ErrorEdit = () => (<div> Error. ID not found. What item do you want to edit? </div>);
const AppRouter =()=> (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch> {/* Switch goes thru our routes in order (top to bottom), and renders the first matching route.*/}
        <Route path="/" component={ExpenseDashboardPage} exact = {true}/> {
        // we have to specify exact = {true} because otherwise, React-router will
        // render all inexact (exact={false})  pages that match 
        // with the path. 
        // e..g if the above isn't exact, then when we go to /settings, then
        // the root and settings page will both be rendered. (which is sometimes 
        // desirable, most times not.
        }
        <Route path="/create" component={AddExpensePage}/> {/* We have to change
        //webpack config to tell dev server to always show index.html file for 404 pages
        // i.e. when we tried to request to server but nothing is found (cos we're using
        // client side routing).
        // . Otherwise, when we get /settings, this will be an actual GET request 
        // to the server, even though we want client-side routing.*/}
        <Route path = "/edit/:id" component={EditExpensePage} />
        <Route path = "/edit" component={ErrorEdit} />
        <Route component={NotFoundPage} /> {/* final route is a 404. */}
      </Switch>
    </div>
  </BrowserRouter>
);
export default AppRouter;


