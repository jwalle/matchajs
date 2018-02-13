import * as React from 'react';
import NavigationBar from './navigationBar/navigation';
require('./app.css');

interface Props {
  children: any;
}

export default class App extends React.Component<Props, {}> {

  render() {
    return (
      <div>
        <NavigationBar />
        <div id="main-container">
          {this.props.children}
        </div>
        <footer className="footer">&copy; 2017 - jwalle</footer>
      </div>
    );
  }
}
