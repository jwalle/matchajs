import React from 'react';
import { Link } from 'react-router';
import style from './App.css';
import NavigationBar from './navigationBar/navigation.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <div className='container'>
          <footer className='footer'>
            &copy; 2017 - jwalle
          </footer>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
