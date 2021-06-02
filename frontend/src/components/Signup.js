import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

import { withRouter } from 'react-router';

class Signup extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    fetch('http://localhost:3000/users',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ user: {...this.state} })
    }).then(res => res.json())
    .then(tokenObj => {
      if(tokenObj.token){
        localStorage.setItem('token',tokenObj.token)
        // this.props.handleLogin(tokenObj.token)
        this.props.history.push('/')
      }else{
        alert('Login failed..')
      }
    })
  }

  render(){
    return (
      <Segment className={'form-container'}>
        <Form onSubmit={this.handleSubmit} autocomplete={"off"}>
          <Form.Field>
            <label>Username</label>
            <input name='username' placeholder='Username' onChange={this.handleInputChange} />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input type='password' name='password' placeholder='Password' onChange={this.handleInputChange} />
          </Form.Field>

          <Button type='submit' positive>
            Signup
          </Button>

          <Button as={'a'} href={'/login'} color={'teal'}>
            Login
          </Button>
        </Form>
      </Segment>
    )
  }
}

export default withRouter(Signup);