import { Route, Switch } from 'react-router-dom';
import Navbar from './common/navbar';
import Posts from './components/posts';
import AddPost from './components/addPost';
import User from './components/user';
import SinglePost from './components/singlePost';
import AllUsers from './components/allUsers';
import UpdatePost from './components/updatePost';
import UserDetail from './components/userDetail';
import PostContextProvider from './context/postContext';
import UserProfileContextProvider from './context/userProfileContext';
import AllUserContextProvider from './context/allUserContext';

function App() {
  return (
    <div className='container'>
      <PostContextProvider>
        <Navbar />
        <AllUserContextProvider>
          <UserProfileContextProvider>
            <Switch>
              <Route path='/user/:id' component={UserDetail} />
              <Route path='/posts/:id' component={SinglePost} />
              <Route path='/update/:id' component={UpdatePost} />
              <Route path='/all-users' component={AllUsers} />
              <Route path='/users' component={User} />
              <Route path='/add' component={AddPost} />
              <Route path='/' exact component={Posts} />
            </Switch>
          </UserProfileContextProvider>
        </AllUserContextProvider>
      </PostContextProvider>
    </div>
  );
}

export default App;
