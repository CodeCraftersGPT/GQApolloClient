import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_BOOK = gql`
  mutation($input: BookInput!) {
    addBook(input: $input) {
      id
      title
      author
    }
  }
`;

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const [addBookMutation] = useMutation(ADD_BOOK);

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addBookMutation({ variables: { input: { title, author } } });
      console.log('Added book:', data.addBook);

      // Clear input fields
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleAddBook}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
