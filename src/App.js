import React from 'react';

import BlogPost from './components/BlogPost/BlogPost';

import './App.scss';

export const POSTS_ENDPOINT_URL = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPosts: []
    };
  }

  componentDidMount() {
    fetch(POSTS_ENDPOINT_URL)
        .then(response => response.json())
        .then(blogPosts => this.setState(
            {blogPosts: this.parsePosts(blogPosts)}));
  }

  parsePosts(blogPosts) {
    let index = 0;
    const result = [];

    while (index < blogPosts.length) {
      if (index % 3 === 0) result.push([]);
      result[result.length - 1].push(blogPosts[index++]);
    }

    return result;
  }

  renderPosts() {
    return this.state.blogPosts.map((blogPosts, index) => (
        <div className='row' key={index}>
          {
            blogPosts
                .map(blogPost => (
                    <BlogPost key={blogPost.id} blogPost={blogPost}/>))
          }
        </div>
    ));
  }

  render() {
    return (
        <div className="posts-container">
          {this.renderPosts()}
        </div>
    );
  }
}

export default App;
