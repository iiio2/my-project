import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../services/httpService';
import config from '../config.json';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';

const UserDetail = (props) => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const { data: user } = await http.get(
      config.apiEndpoint + 'users/' + props.match.params.id
    );
    setUser(user);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const getUserPosts = async () => {
    setLoading(true);
    const { data: posts } = await http.get(
      config.apiEndpoint + 'users/' + props.match.params.id + '/posts'
    );
    setLoading(false);
    setPosts(posts);
  };

  useEffect(() => {
    getUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);

  if (loading) return <p>Loading...</p>;

  if (!user.name) return null;

  return (
    <Fragment>
      <h4>User Detail</h4>
      <p className='lead'>Name: {user.name} </p>
      <p className='lead'>Email: {user.email} </p>
      <p className='lead'>Phone: {user.phone} </p>
      <p className='lead'>
        Address: {user.address.street}, {user.address.city},{' '}
      </p>
      <p className='lead'>Company: {user.company.name}</p>
      <hr />
      <h4>User ({user.name}'s) All Posts</h4>
      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.id}>
            {' '}
            <h6>
              <Link to={`/posts/${post.id}`}> {post.title} </Link>
            </h6>
          </li>
        ))}
      </ul>
      <Pagination
        pageSize={pageSize}
        handlePage={handlePage}
        posts={posts}
        currentPage={currentPage}
      />
    </Fragment>
  );
};

export default UserDetail;
