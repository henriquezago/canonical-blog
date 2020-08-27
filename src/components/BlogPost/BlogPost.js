import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import BlogPostContent from './BlogPostContent';

import './BlogPost.scss';

class BlogPost extends PureComponent {
  getTaxonomy(id) {
    if (!id) {
      return {};
    }

    const wpTerms = this.props.blogPost._embedded['wp:term'];
    for (let i = 0; wpTerms.length > i; i++) {
      for (const wpTermsKey in wpTerms) {
        const result = wpTerms[wpTermsKey].find(
            wpTerm => wpTerm.id === id);

        if (result) return result;
      }
    }

    return {};
  }

  render() {
    const {blogPost} = this.props;
    const category = this.getTaxonomy(blogPost.categories[0]);
    const group = this.getTaxonomy(blogPost.group[0]);
    const groupName = group.name || 'General';

    return (
        <div className="col-4 p-card blog-post">
          <header className="blog-p-card__header">
            <h5 className='p-muted-heading'>
              {groupName}
            </h5>
          </header>

          <BlogPostContent blogPost={blogPost}/>

          <p className='p-card__footer'>
            {category.name}
          </p>
        </div>
    );
  }
}

BlogPost.propTypes = {
  blogPost: PropTypes.object.isRequired
};

export default BlogPost;
