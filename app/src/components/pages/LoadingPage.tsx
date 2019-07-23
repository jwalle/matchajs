import * as React from 'react';
import { Loader } from 'semantic-ui-react';

const LoadingPage: React.SFC = () => {
  return (
    <div className="loading-container">
      <Loader active />
      {/* <h1>PAGE IS LOADING</h1> */}
    </div>
  );
};

export default LoadingPage;