import { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchUser from './searchUser';
import Pagination from '../common/userPagination';
import { paginate } from '../utils/paginate';
import { AllUserContext } from '../context/allUserContext';

const AllUsers = () => {
  const {
    users,
    sortName,
    sortEmail,
    selectUsers,
    handleSelectUsers,
    currentPage,
    loading,
    searchQuery,
  } = useContext(AllUserContext);

  let allUsers = users;

  if (searchQuery) {
    allUsers = users.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (allUsers) {
    allUsers =
      selectUsers === 'All' ? users : paginate(users, currentPage, selectUsers);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <div className='row'>
        <div className='col-sm-7'>
          <form>
            <div className='form-group'>
              <p className='lead'>
                Select Number of <b>Users</b> to See Per Page
              </p>
              <select
                value={selectUsers}
                className='form-control'
                onChange={(e) => handleSelectUsers(e.target.value)}
              >
                <option value='All'>All</option>
                <option value='5'>5</option>
                <option value='3'>3</option>
              </select>
            </div>
          </form>

          <table className='table'>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={sortName}>
                  Name
                </th>
                <th style={{ cursor: 'pointer' }} onClick={sortEmail}>
                  Email
                </th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {' '}
                    <Link to={`/user/${user.id}`}>{user.name}</Link>{' '}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='col-sm-5'>
          <SearchUser />
        </div>
      </div>

      <Pagination />
    </Fragment>
  );
};

export default AllUsers;
