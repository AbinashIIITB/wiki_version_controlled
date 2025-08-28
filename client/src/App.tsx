import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import './styles/index.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <Routes />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;