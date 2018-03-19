import React, { Component } from 'react';
import axios from 'axios';
import SavedArticle from './SavedArticle';

class SavedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.getSavedArticles = this.getSavedArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentWillMount() {
    this.getSavedArticles();
  }

  getSavedArticles() {
    axios.get('/articles/saved')
      .then(res => {
        this.setState({
          articles: res.data
        }, () => console.log(this.state.articles));
      })
      .catch(err => console.log(err));
  }

  deleteArticle(articleId) {
    axios.delete(`/articles/${articleId}`)
      .then(res => {
        this.getSavedArticles();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="saved-articles container">
        <div className="row">
          {this.state.articles.map((article, i) => 
            <SavedArticle key={i} article={article} deleteArticle={this.deleteArticle} />
          )}
        </div>
      </div>
    );
  }
}

export default SavedArticles;