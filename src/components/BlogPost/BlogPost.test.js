import React from 'react';
import {render} from '@testing-library/react';

import BlogPost from './BlogPost';
import sampleResponse from '../../sample-response.json';
import BlogPostContent from './BlogPostContent';

describe('BlogPost', () => {
  let blogPostStub;
  let renderResult;

  beforeEach(() => {
    blogPostStub = sampleResponse[0];
    renderResult = render(<BlogPost blogPost={blogPostStub}/>);
  });

  test('renders post title', () => {
    const {getByText} = renderResult;

    const titleElement = getByText(
        new RegExp(blogPostStub.title.rendered, 'g'));
    expect(titleElement).toBeInTheDocument();
  });

  test('renders BlogPostContent', () => {
    const {container} = renderResult;
    const contentElement = container.getElementsByTagName(BlogPostContent);

    expect(contentElement).toBeTruthy();
  });

  test('renders category name', () => {
    const {getByText} = renderResult;

    const categoryHeading = getByText(/People and culture/i);
    expect(categoryHeading).toBeInTheDocument();
  });

  test('renders group name', () => {
    const {getByText} = renderResult;

    const categoryHeading = getByText(/Articles/i);
    expect(categoryHeading).toBeInTheDocument();
  });
});
