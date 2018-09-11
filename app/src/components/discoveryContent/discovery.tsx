import * as React from 'react';
import UserBlock from './UserBlock';

export interface DiscoveryProps {
    class: string;
}

export default class Discovery extends React.Component<DiscoveryProps, {}> {

    render() {
        const user = {
            img: '../../../data/photos/happygorilla308/happygorilla308-1535384495459.jpg',
            // img: 'https://source.unsplash.com/collection/1390381/',
            login: 'lilia',
            age: 18,
            location: {city: 'paris'}
        };

        return (
            <div id={'main-' + this.props.class} className="flex">
                <UserBlock user={user} />
                <UserBlock user={user} />
                <UserBlock user={user} />
                <UserBlock user={user} />
                <UserBlock user={user} />
                <UserBlock user={user} />
            </div>
        );
    }
}