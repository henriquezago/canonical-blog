import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class BlogPostContent extends PureComponent {
  createMarkup() {
    return {__html: this.props.blogPost.title.rendered};
  }

  renderAuthorLink() {
    const {blogPost} = this.props;
    const author = blogPost._embedded.author[0];

    return (
        <a href={author.link}>
          {author.name}
        </a>
    );
  }

  render() {
    const {blogPost} = this.props;
    const formattedDate = moment(blogPost.date).format('DD MMMM YYYY');

    return (
        <div className='p-card__content'>
          <a href={blogPost.link} aria-hidden={true} tabIndex={-1}>
            <img src={blogPost.featured_media} alt=""/>
          </a>

          <h3 className='p-heading--four'>
            <a href={blogPost.link}
               dangerouslySetInnerHTML={this.createMarkup()}>
            </a>
          </h3>
          <p>
            <em>
              By {this.renderAuthorLink()} on {formattedDate}
            </em>
          </p>
        </div>
    );
  }
}

BlogPostContent.propTypes = {
  blogPost: PropTypes.object.isRequired
};

export default BlogPostContent;
