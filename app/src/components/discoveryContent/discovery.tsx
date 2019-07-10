import * as React from 'react';
import UserBlock from './UserBlock';

export interface DiscoveryProps {
    class: string;
    users: any[];
}

export default class Discovery extends React.Component<DiscoveryProps, {}> {

    render() {
        return (
            <div id={'main-' + this.props.class} className="main-discovery">
                {
                    this.props.users ? this.props.users.map((user: any) =>
                        <UserBlock key={user.id} user={user} />
                    )
                        : <h1 style={{ padding: '50px 0px' }}>You should like more profil !</h1>

                }
            </div>
        );
    }
}