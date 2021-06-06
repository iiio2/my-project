import { useContext } from 'react';
import { PostContext } from '../context/postContext';

const LoadMore = () => {
  const { eachPagePosts } = useContext(PostContext);

  return (
    <button onClick={eachPagePosts} className='btn btn-light mb-5'>
      Load More
    </button>
  );
};

export default LoadMore;
