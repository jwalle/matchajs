import * as React from 'react';
import NavigationBar from './navigationBar/navigation';
require('./app.css');

interface Props {
  children: any;
}

export default class App extends React.Component<Props, {}> {

  render() {
    return (
      <div id="ui container">
        <NavigationBar />
        <div id="main-container">
        <div id="central-container">
          {this.props.children}
          </div>
        </div>
        <footer className="footer">&copy; 2017 - jwalle</footer>
      </div>
    );
  }
}
