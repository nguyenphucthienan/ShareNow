import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PostCard extends Component {
  constructor(props) {
    super(props);
    const { _id: userId } = this.props.user;
    const { hearts } = this.props.post;

    this.state = {
      isPostHearted: hearts.includes(userId),
      numOfHearts: hearts.length
    };
  }

  async heartOrUnheartPost() {
    if (this.state.isPostHearted) {
      this.setState({
        isPostHearted: !this.state.isPostHearted,
        numOfHearts: this.state.numOfHearts - 1
      });
    } else {
      this.setState({
        isPostHearted: !this.state.isPostHearted,
        numOfHearts: this.state.numOfHearts + 1
      });
    }

    try {
      const { _id: postId } = this.props.post;
      await axios.post(`/api/posts/${postId}/heart`, null);
    } catch (err) {
      console.log(err);
    }
  }

  renderHeartButton() {
    if (this.props.user) {
      const heartColor = this.state.isPostHearted ? 'pink lighten-1' : 'grey darken-2';

      return (
        <a
          className={`btn-floating halfway-fab waves-effect waves-light ${heartColor}`}
          onClick={() => this.heartOrUnheartPost()}
        >
          <i className="material-icons">favorite</i>
        </a >
      );
    }

    return <div />;
  }

  render() {
    const {
      _id: postId,
      image,
      title
    } = this.props.post;

    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image">
            <img className="image-cover" src={image} alt={title} />
            <Link to={`/posts/${postId}`}>
              <span className="card-title dark-background">{title}</span>
            </Link>
            {this.renderHeartButton()}
          </div>
          <div className="card-content">
            <p>
              <span className="card-content-title">Hearts: </span>
              <span>{this.state.numOfHearts}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, posts: { page } }) {
  return { user, page };
}

export default connect(mapStateToProps)(withRouter(PostCard));