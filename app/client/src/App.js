import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './App.css';

// components
import GenericComponent from './components/GenericComponent'

// pages
import HomePage from './pages/HomePage'
import AddPost from './pages/AddPost'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import MyPosts from './pages/MyPosts'
import EditPost from './pages/EditPost'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import Post from './pages/Post'

class App extends Component {
  render() {
    return(
    	<Router>
    		<Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/Home" component={HomePage} />
    	    	<Route exact path="/Login" component={Login} />
    	    	<Route exact path="/MyPosts" component={MyPosts} />
    	    	<Route exact path="/EditPost" component={EditPost} />
    	    	<Route exact path="/Favorites" component={Favorites} />
                <Route exact path="/Search" component={Search} />

                <Route exact path="/Post" component={Post} />
    			<Route exact path="/AddPost" component={AddPost} />
    			<Route exact path = "/NotFound" component={NotFound} />
    			<Redirect to="/NotFound"/>
    		</Switch>
    	</Router>
    );
  }
}

export default App;
