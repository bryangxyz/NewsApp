import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      source: this.props.article.source.id,
    }, () => this.props.searchSource(this.state.source));
  }

  render() {
    let articleSource = this.props.article.source.id ? 
      <button className="btn btn-sm btn-link" onClick={this.handleClick}>{this.props.article.source.name}</button> : 
      <small className="text-muted">
        {this.props.article.source.name}
      </small>;

    return (
      <div className="col-md-4">
        <div className="card">
          <img src={this.props.article.urlToImage} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{this.props.article.title}</h5>
            <p className="card-text">{this.props.article.description}</p>
            
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <a className="btn btn-primary" href={this.props.article.url} target="_blank">Read</a>
            </div>
            {articleSource}
          </div>
        </div>
      </div>
    );
  }
}

export default Article;