import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  handleSubmit(e) {
    const keyword = this.state.keyword.replace(/\s/g, '');
    const newKeyword = `"${keyword}"`;
    console.log('keyword',newKeyword);
    this.props.searchArticles(newKeyword);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Looking for something interesting?</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Search Keyword</label>
            <input type="text" className="form-control" placeholder="Search Keyword..." onChange={this.handleChange} />
          </div>
          <input type="submit" className="btn btn-primary" value="Get News"/>
        </form>
      </div>
    );
  }
}

export default Search;