import { useContext } from 'react';
import { AllUserContext } from '../context/allUserContext';

const Pagination = () => {
  const { users, selectUsers, handleCurrentPage, currentPage } =
    useContext(AllUserContext);

  const totalPages = Math.ceil(users.length / Number(selectUsers));

  if (totalPages === 1) return null;

  const pages = [];
  if (selectUsers === 3) {
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(i);
    }
  }

  if (selectUsers === 5) {
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(i);
    }
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
            <a onClick={() => handleCurrentPage(page)} className='page-link'>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
