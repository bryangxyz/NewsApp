import React, { Component } from 'react';

class SavedArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const articleId = this.props.article._id;
    this.props.deleteArticle(articleId);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <img src={this.props.article.img} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{this.props.article.title}</h5>
            <p className="card-text">{this.props.article.description}</p>
            
          </div>
          <div className="card-footer">
              <a className="read-btn btn btn-sm btn-primary" href={this.props.article.url} target="_blank">Read</a>
              <button className="btn btn-sm btn-danger" onClick={this.onDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedArticle;