import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './App.css';

// components
import GenericComponent from './components/GenericComponent'

// pages
import Overview from './pages/Overview'
import HomePage from './pages/HomePage'
import AddPost from './pages/AddPost'
import NotFound from './pages/404Page'
import Login from './pages/Login'
import BuyerHome from './pages/BuyerHome'
import SellerHome from './pages/SellerHome'
import EditPost from './pages/EditPost'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import Post from './pages/Post'

class App extends Component {
  render() {
    return(
    	<Router>
    		<Switch>
                <Route exact path="/" component={Overview} />
                <Route exact path="/Home" component={HomePage} />
    	    	<Route exact path="/Login" component={Login} />
    	    	<Route exact path="/BuyerHome" component={BuyerHome} />
    	    	<Route exact path="/SellerHome" component={SellerHome} />
    	    	<Route exact path="/EditPost" component={EditPost} />
    	    	<Route exact path="/Favorites" component={Favorites} />
                <Route exact path="/Search" component={Search} />

                <Route exact path="/Post" component={Post} />
    			<Route exact path="/AddPost" component={AddPost} />
    			<Route exact path = "/404" component={NotFound} />
    			<Redirect to="/404"/>
    		</Switch>
    	</Router>
    );
  }
}

export default App;
