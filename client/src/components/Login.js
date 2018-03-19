import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.handleAuthentication(user);
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <input className="btn btn-primary" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;