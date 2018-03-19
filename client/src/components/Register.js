import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: []
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
      password: this.state.password,
      password2: this.state.password2
    };
    axios.post(
      '/users/register',
      user
    ).then(res => {
      if (!res.data.errors) {
        this.props.history.push('/users/login');
      } else {
        this.setState({
          errors: res.data.errors
        }, () => console.log(this.state.errors));
      }
    }).catch(err => console.log(err));
    e.preventDefault();
  }
  
  render() {
    const errors = this.state.errors.length > 0 && (
      this.state.errors.map((error, i) => (
        <div key={i} className="alert alert-danger" role="alert">
          {error.msg}
        </div>
      ))
    );

    return (
      <div className="container">
        {errors}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
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