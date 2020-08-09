import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './App.css';

// components
import GenericComponent from './components/GenericComponent'

// pages
import HomePage from './pages/HomePage'
import AddPost from './pages/AddPost'
import NotFound from './pages/404Page'

class App extends Component {
  render() {
    return(
    	<Router>
    		<Switch>
    	    	<Route exact path="/" component={HomePage} />
    			<Route exact path="/AddPost" component={AddPost} />
    			<Route exact path = "/404" component={NotFound} />
    			<Redirect to="/404"/>
    		</Switch>
    	</Router>
    );
  }
}

export default App;
