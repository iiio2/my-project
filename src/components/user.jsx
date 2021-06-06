import { Fragment, useContext } from 'react';
import { UserProfileContext } from '../context/userProfileContext';

const User = (props) => {
  const { deletePost, userPosts, loading } = useContext(UserProfileContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <h3>User Posts | Current User Id# 2</h3>

      <ul>
        {userPosts.map((userPost) => (
          <li key={userPost.id} className='my-1'>
            <h6>{userPost.title}</h6>
            <p>{userPost.body}</p>

            <button
              onClick={() => props.history.push(`/update/${userPost.id}`)}
              className='btn btn-info btn-sm'
            >
              Update
            </button>
            <button
              onClick={() => deletePost(userPost)}
              className='btn btn-danger btn-sm mx-2'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default User;
