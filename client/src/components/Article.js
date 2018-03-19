import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      saved: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  handleClick() {
    this.setState({
      source: this.props.article.source.id,
    }, () => this.props.searchSource(this.state.source));
  }

  saveArticle() {
    const newArticle = {
      userId: this.props.user._id,
      title: this.props.article.title,
      description: this.props.article.description,
      url: this.props.article.url,
      img: this.props.article.urlToImage
    };
    console.log('newArticle', newArticle);
    axios.post(
      '/articles/add',
      newArticle
    ).then(res => {
      this.setState({
        saved: true
      });
    }).catch(err => console.log(err));
  }

  render() {
    let articleSource = this.props.article.source.id ? 
      <button className="btn btn-sm btn-link" onClick={this.handleClick}>{this.props.article.source.name}</button> : 
      <small className="text-muted">
        {this.props.article.source.name}
      </small>;

    let saveButton = this.state.saved ?
      <button className="btn btn-sm btn-primary" disabled onClick={this.saveArticle}>Saved</button> :
      (
        this.props.user.name === undefined ? 
          <button className="btn btn-sm btn-primary" disabled onClick={this.saveArticle}>Save</button> :
          <button className="btn btn-sm btn-primary" onClick={this.saveArticle}>Save</button> 
      );

    return (
      <div className="col-md-4">
        <div className="card">
          <img src={this.props.article.urlToImage} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{this.props.article.title}</h5>
            <p className="card-text">{this.props.article.description}</p>
            
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div>
              <a className="read-btn btn btn-sm btn-primary" href={this.props.article.url} target="_blank">Read</a>
              {saveButton}
            </div>
            {articleSource}
          </div>
        </div>
      </div>
    );
  }
}

export default Article;