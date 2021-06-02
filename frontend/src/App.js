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

  state = {
    trails: [],
    reviews: [],
  }

  // handleLogin = () => {
  //   fetch("http://localhost:3000/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((userObj) => {
  //       console.log(userObj)
  //       // let user = userObj.data.attributes
  //       // this.props.dispatch({ type: "GET_USER", user })
  //     });
  // }

  getTrails = () => {
    let params = {
      lat: "37.09024",
      lon: "-95.712891",
      };
    let trailURL = `http://localhost:3000/trails/?lat=${params.lat}&lon=${params.lon}`

    fetch(trailURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => r.json())
      .then((result) => {
        // console.log(result.trails)
        this.setState({ trails: result.trails });
      });
  };

  getReviews = () => {
    fetch("http://localhost:3000/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => r.json())
      .then((json) => {
        this.setState({ reviews: json });
      });
  };

  componentDidMount() {
    this.getTrails();
    this.getReviews();
  };

  addToFavorites = (e, trail) => {
    e.stopPropagation()
    let favorite = {
      user_id: user.id,
      trail_id: trail.id
    }

    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(favorite)
    }
    fetch(`http://localhost:3000/user_trails`, reqPackage)
    .then(r => r.json())
    .then(fave =>  {this.setState({
      trails: this.state.trails.map(trail => trail.id !== fave.trail.id ? trail : purch.trail ), trailView: false})
      this.props.history.push(`/users/${this.state.currentUser.id}`)
    }
    )
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>

            <Route exact path='/' component={() => (
              <Home trails={this.state.trails} reviews={this.state.reviews}
              />
            )} />

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