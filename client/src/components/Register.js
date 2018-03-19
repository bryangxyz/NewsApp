import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios.post(
      '/users/register',
      user
    ).then(res => {
      this.props.history.push('/users/login');
    }).catch(err => console.log(err));
    e.preventDefault();
  }
  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Password Confirm:</label>
            <input className="form-control" type="text" name="password2" value={this.state.password2} onChange={this.handleChange} />
          </div>
          <input className="btn btn-primary" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;