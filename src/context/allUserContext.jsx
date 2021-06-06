import { createContext, useState, useEffect } from 'react';
import { http } from '../services/httpService';
import config from '../config.json';

export const AllUserContext = createContext();

const AllUserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectUsers, setSelectUsers] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    const { data: users } = await http.get(config.apiEndpoint + 'users');
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortName = () => {
    const usrs = [...users];
    if (toggle === false) {
      usrs.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setUsers(usrs);
      setToggle(true);
    }
    if (toggle) {
      usrs.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      setUsers(usrs);
      setToggle(false);
    }
  };

  const sortEmail = () => {
    const usrs = [...users];
    if (toggle === false) {
      usrs.sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      });
      setUsers(usrs);
      setToggle(true);
    }
    if (toggle) {
      usrs.sort((a, b) => {
        if (a.email < b.email) {
          return 1;
        }
        if (a.email > b.email) {
          return -1;
        }
        return 0;
      });
      setUsers(usrs);
      setToggle(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('1');
    setSelectUsers('All');
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleSelectUsers = (path) => {
    setSelectUsers(path);
    setCurrentPage(1);
  };

  return (
    <AllUserContext.Provider
      value={{
        users,
        sortName,
        sortEmail,
        searchQuery,
        handleSearch,
        selectUsers,
        handleSelectUsers,
        currentPage,
        handleCurrentPage,
        loading,
      }}
    >
      {props.children}
    </AllUserContext.Provider>
  );
};

export default AllUserContextProvider;
