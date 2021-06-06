import { Fragment, useState, useEffect, useContext } from 'react';
import { http } from '../services/httpService';
import config from '../config.json';
import { UserProfileContext } from '../context/userProfileContext';

const UpdatePost = (props) => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { update } = useContext(UserProfileContext);

  const getPost = async () => {
    const { data: post } = await http.get(
      config.apiEndpoint + 'posts/' + props.match.params.id
    );
    setPost(post);
    setTitle(post.title);
    setBody(post.body);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const obj = { title, body, id: Number(props.match.params.id) };

    update(obj);
    props.history.push('/users');
  };

  if (!post.title) return <p>Loading...</p>;

  return (
    <Fragment>
      <form onSubmit={handleEdit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='form-control'
          />
        </div>

        <button
          disabled={title.trim().length === 0 || body.trim().length === 0}
          className='btn btn-secondary mt-2'
        >
          Update
        </button>
      </form>
    </Fragment>
  );
};

export default UpdatePost;
