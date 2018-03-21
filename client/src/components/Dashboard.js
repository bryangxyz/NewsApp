import React, { Component } from 'react';
import Search from './Search';
import Article from './Article';
import keys from '../config/keys';

const mykey = process.env.NEWSAPI_KEY || keys.NEWSAPI_KEY;
console.log(mykey);
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.getTopNews = this.getTopNews.bind(this);
    this.searchArticles = this.searchArticles.bind(this);
    this.searchSource = this.searchSource.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getTopNews();
  }

  getTopNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${mykey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: data.articles
        }, () => console.log(this.state.articles))
      });
  }

  getCategory(e) {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${e.target.id}&apiKey=${mykey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: data.articles
        }, () => console.log(this.state.articles))
      });
  }

  searchArticles(keyword) {
    if (keyword) {
      fetch(`https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${mykey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: data.articles
        }, () => console.log(this.state.articles))
      });
    } else {
      this.getTopNews();
    }
    
  }

  searchSource(source) {
    fetch(`https://newsapi.org/v2/everything?sources=${source}&sortBy=popularity&apiKey=${mykey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: data.articles
        }, () => window.scrollTo(0, 0))
      });
  }

  render() {
    return (
      <div className="container">
        <Search searchArticles={this.searchArticles} />
        <div>
          <h2>Top News</h2>
          <h2>{process.env.NEWSAPI_KEY}</h2>
          <h2>{keys.NEWSAPI_KEY}</h2>
          <div className="category">
            Category:
            <button type="button" className="btn btn-primary btn-sm" id="business" onClick={this.getCategory}>business</button>
            <button type="button" className="btn btn-secondary btn-sm" id="entertainment" onClick={this.getCategory}>entertainment</button>
            <button type="button" className="btn btn-success btn-sm" id="health" onClick={this.getCategory}>health</button>
            <button type="button" className="btn btn-danger btn-sm" id="science" onClick={this.getCategory}>science</button>
            <button type="button" className="btn btn-warning btn-sm" id="sports" onClick={this.getCategory}>sports</button>
            <button type="button" className="btn btn-info btn-sm" id="technology" onClick={this.getCategory}>technology</button>
            <button type="button" className="btn btn-light btn-sm" id="general" onClick={this.getCategory}>general</button>
          </div>
          <br />
          
          <div className="row">
            {this.state.articles.map((article, i) => 
              <Article key={i} article={article} searchSource={this.searchSource} user={this.props.user} />
            )}
          </div>
         
        </div>
      </div>
    );
  }
}

export default Dashboard;