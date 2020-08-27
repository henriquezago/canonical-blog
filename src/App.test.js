import React from 'react';
import {render} from '@testing-library/react';
import {waitForDomChange} from '@testing-library/dom';

import App, {POSTS_ENDPOINT_URL} from './App';
import BlogPost from './components/BlogPost/BlogPost';
import sampleResponse from './sample-response.json';

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => sampleResponse
    });
  });

  test('renders blog posts', async () => {
    const result = render(<App/>, {hydrate: false});
    const {container} = result;

    expect(window.fetch).toHaveBeenCalledWith(POSTS_ENDPOINT_URL);

    await waitForDomChange(() => {
      const rows = container.getElementsByClassName('row');
      const blogPosts = container.getElementsByTagName(BlogPost);
      expect(rows).toHaveLength(1);
      expect(blogPosts).toHaveLength(3);
    });
  });
});
