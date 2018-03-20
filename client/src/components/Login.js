import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error
      })
    } 
    
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
    const error = this.state.error && 
      <div className="alert alert-danger" role="alert">
        {this.state.error}
      </div>;

    return (
      <div className="container">
        <br />
        {error}
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