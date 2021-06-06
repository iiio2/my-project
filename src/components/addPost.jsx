import { Fragment, useState, useContext } from 'react';
import { PostContext } from '../context/postContext';

const AddPost = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { addPost } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = { title, body, id: Math.random() * 1000 };

    addPost(obj);
    props.history.push('/');
  };

  return (
    <Fragment>
      <h3>Add Post</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Post Title</label>
          <input
            value={title}
            type='text'
            className='form-control'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Post Description</label>
          <input
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='form-control'
          />
        </div>
        <button
          disabled={title.trim().length === 0 || body.trim().length === 0}
          type='submit'
          className='btn btn-primary mt-2'
        >
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default AddPost;
