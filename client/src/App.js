import React from 'react';
import {Router, Route, Switch, withRouter, BrowserRouter} from 'react-router-dom';
// import {Router, browserHistory} from 'react-router';
import Home from '../src/components/Home/home';
import Dashboard from '../src/components/Dashboard/dashboard';

class App extends React.Component{
    render(){
        return (
            <Switch>
                <Route 
                    exact 
                    path="/" 
                    render={props => <Home {...this.props}/>}
                />
                <Route 
                    exact
                    path="/dashboard" 
                    render={props => <Dashboard {...this.props}/>}
                />
            </Switch>
            // <Router history={browserHistory}>
            //   <Route exact path="/" component={Home}/>
            //   <Route path="/dashboard" component={Dashboard}/>
            // </Router>
        )
    }
}

export default withRouter(App);
