import * as React from 'react';

export interface ConfirmPageProps {
  user: any;
}

const ConfirmPage: React.SFC<ConfirmPageProps> = () => {
    return (
      <div className="main-container">
        <h1>Please confirm your Email.</h1>
      </div>
    );
};

export default ConfirmPage;