import * as React from 'react';
import { connect } from 'react-redux';
import Info from './messages/Message';

interface DashboardProps {
    isConfirmed: boolean;

}

const Dashboard = (props: DashboardProps) => (
    <div>
    {!props.isConfirmed && 
        <Info 
            title="Confirmation"
            text="Please verify your inbox for verification email."
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