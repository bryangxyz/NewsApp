import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: ''
    };
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleAuthentication(user) {
    axios.post(
      '/users/login',
      user
    ).then(res => {
      if (res.data.user.name !== undefined) {
        this.setState({
          user: res.data.user,
        });
      } else {
        this.setState({
          error: res.data.error,
        }, () => console.log(this.state.error));
      }
    }).catch(err => console.log(err));
  }

  handleLogout() {
    axios.get('/users/logout')
      .then(res => {
        this.setState({
          user: {}
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} handleLogout={this.handleLogout} />
        <Main user={this.state.user} handleAuthentication={this.handleAuthentication} error={this.state.error} />
      </div>
    );
  }
}

export default App;
