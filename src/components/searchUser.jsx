import { useContext } from 'react';
import { AllUserContext } from '../context/allUserContext';

const SeachUser = () => {
  const { searchQuery, handleSearch } = useContext(AllUserContext);

  return (
    <input
      style={{ marginTop: '2.9rem' }}
      type='text'
      className='form-control'
      placeholder='Search...'
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SeachUser;
