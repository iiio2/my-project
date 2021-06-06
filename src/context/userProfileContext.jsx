import { createContext, useEffect, useState } from 'react';
import { http } from '../services/httpService';
import config from '../config.json';

export const UserProfileContext = createContext();

const UserProfileContextProvider = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPostsByUserId = async () => {
    setLoading(true);
    const { data: posts } = await http.get(
      config.apiEndpoint + 'posts?userId=2'
    );

    setUserPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    getPostsByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = async (post) => {
    const posts = [...userPosts];
    const index = posts.findIndex((p) => p.id === post.id);

    posts[index] = { ...post };
    setUserPosts(posts);

    await http.put(config.apiEndpoint + 'posts/' + post.id, post);
  };

  const deletePost = async (post) => {
    await http.delete(config.apiEndpoint + 'posts/' + post.id);
    const posts = userPosts.filter((p) => p.id !== post.id);

    setUserPosts(posts);
  };

  return (
    <UserProfileContext.Provider
      value={{ userPosts, update, deletePost, loading }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
