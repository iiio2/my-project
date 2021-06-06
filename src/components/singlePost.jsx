import { Fragment, useEffect, useState } from 'react';
import config from '../config.json';
import { http } from '../services/httpService';

const SinglePost = (props) => {
  const [post, setPost] = useState([]);
  const [comments, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    const { data: post } = await http.get(
      config.apiEndpoint + 'posts/' + props.match.params.id
    );
    setPost(post);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  const getComment = async () => {
    setLoading(true);
    const { data: comments } = await http.get(
      config.apiEndpoint + 'posts/' + props.match.params.id + '/comments'
    );
    setComment(comments);
    setLoading(false);
  };

  useEffect(() => {
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      {post.title && comments && (
        <div>
          <h4 className='mt-4'>{post.title} </h4>
          <p className='lead'>{post.body}</p>

          <section className='comments'>
            <h5>Comments</h5>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>Name: {comment.name}</p>
                  <p>Email: {comment.email}</p>
                  <p>Body: {comment.body}</p>
                  <hr />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default SinglePost;
