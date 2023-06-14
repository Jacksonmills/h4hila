import React from 'react';
import Layout from '~/components/Layout';

export default function CreatePage() {
  return (
    <Layout>
      <h1>Create a post</h1>
      <label htmlFor="image">Image</label>
      <input type="file" name="image" />
      <label htmlFor="content">Content</label>
      <input type="text" placeholder="Write a message..." />
    </Layout>
  );
}
