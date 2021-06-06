const Pagination = ({ handlePage, pageSize, posts, currentPage }) => {
  const totalPages = Math.ceil(posts.length / pageSize);

  const pages = [];

  for (let i = 1; i < totalPages + 1; i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            key={page}
            style={{ cursor: 'pointer' }}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a onClick={() => handlePage(page)} className='page-link'>
              {' '}
              {page}{' '}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
