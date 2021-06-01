import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import Nav from './components/Nav';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends React.Component {

  handleLogin = () => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((userObj) => {
        console.log(userObj)
        // let user = userObj.data.attributes
        // this.props.dispatch({ type: "GET_USER", user })
      });
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>

            <Route exact path='/' component={Home} />

            <Route path='/profile' component={() => {
              return localStorage.getItem('token')
                ? <Profile handleLogin={this.handleLogin} /> : <Redirect to='/login' />
            }} />

            <Route path='/login' component={() => (
              <Login />
            )} />

            <Route path='/signup' component={() => (
              <Signup handleLogin={this.handleLogin} />
            )} />

            <Route path='/logout' component={() => {
              localStorage.clear()
              return <Redirect to='/' />
            }} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;