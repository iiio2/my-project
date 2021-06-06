import { createContext, useEffect, useState } from 'react';
import { http } from '../services/httpService';
import config from '../config.json';

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    const { data: posts } = await http.get(config.apiEndpoint + 'posts');
    setLoading(false);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eachPagePosts = () => {
    setPostsPerPage((prevState) => prevState + 10);
  };

  const addPost = async (obj) => {
    const allPosts = [obj, ...posts];
    setPosts(allPosts);
    await http.post(config.apiEndpoint + 'posts', obj);
  };

  return (
    <PostContext.Provider
      value={{ posts, eachPagePosts, postsPerPage, loading, addPost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
