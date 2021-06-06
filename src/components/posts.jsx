import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../context/postContext';
import LoadMore from '../common/loadMore';

const Posts = (props) => {
  const { posts, postsPerPage, loading } = useContext(PostContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <h4> All Posts </h4>
      <button
        onClick={() => props.history.push('/add')}
        className='btn btn-secondary'
      >
        Add New
      </button>
      <ul>
        {posts.slice(0, postsPerPage).map((post) => (
          <li key={post.id} className='mb-2'>
            <h6>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h6>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {posts.length !== 0 && <LoadMore />}
    </Fragment>
  );
};

export default Posts;
