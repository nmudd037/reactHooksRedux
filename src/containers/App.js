import './App.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestRobots, setSearchField } from '../actions';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';

function App() {
  //const [robots, setRobots] = useState([]);
  //const [searchfield, setSearchfield] = useState('');

  const dispatch = useDispatch();
  const { searchField } = useSelector((state) => state.searchRobots);
  // eslint-disable-next-line no-unused-vars
  const { robots, isPending, error } = useSelector((state) => state.displayRobots);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((users) => {
  //       setRobots(users);
  //     });
  // }, []);

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };

  const onRequestRobots = () => {
    dispatch(requestRobots());
  };

  useEffect(() => {
    onRequestRobots();
  }, []);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
