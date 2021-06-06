export const paginate = (items, currentPage, pageSize) => {
  const index = (currentPage - 1) * pageSize;

  const posts = items.slice(index);
  const newPosts = posts.slice(0, pageSize);

  return newPosts;
};
