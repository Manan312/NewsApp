import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description,author,publishedAt, imageUrl, newsUrl,source} = this.props;
    return (
      <div className="my-3 mx-3">
        <div className="card">
          <img src={imageUrl!==null && imageUrl!==undefined && imageUrl.length>0 ? imageUrl : "https://i.cbc.ca/1.7620554.1756416845!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/ns-alert-app.jpg?im=Resize%3D620"} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title} + ...
              <span style={{left:"80%", zIndex: 1}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                {source}
              </span>
            </h5>
            <p className="card-text">
              {description}
            </p>
            <footer className="blockquote-footer mt-2">
              <small className="text-muted">
                {new Date(publishedAt).toGMTString()}
                <br />
                By {author ? author : "Unknown"}
              </small>
            </footer>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">
              Read more
            </a>
            
          </div>
        </div>
      </div>
    );
  }
}
