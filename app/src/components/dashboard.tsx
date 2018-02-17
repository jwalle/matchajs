import * as React from 'react';
import { connect } from 'react-redux';
import Message from './messages/Message';

interface DashboardProps {
    isConfirmed: boolean;

}

const Dashboard = (props: DashboardProps) => (
    <div>
    {!props.isConfirmed && 
        <Message 
            title="Confirmation"
            message="Please verify your inbox for verification email."
            style="info"
        />
    }
    </div>
);

function mapStateToProps(state: any) {
    return {
        isConfirmed: !!state.user.confirmed
    };
}

export default connect<{}, any>(mapStateToProps, { })(Dashboard);