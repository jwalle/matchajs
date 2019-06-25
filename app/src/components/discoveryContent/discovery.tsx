import * as React from 'react';
import UserBlock from './UserBlock';

export interface DiscoveryProps {
    class: string;
    users: any[];
}

export default class Discovery extends React.Component<DiscoveryProps, {}> {

    render() {
        // const user = {
        //     img: '../../../data/photos/happygorilla308/happygorilla308-1535384495459.jpg',
        //     // img: 'https://source.unsplash.com/collection/1390381/',
        //     login: 'lilia',
        //     age: 18,
        //     location: {city: 'paris'}
        // };
        console.log('PLOP: ', this.props.users);
        return (
            <div id={'main-' + this.props.class} className="flex">
                {
                    this.props.users && this.props.users.map((user: any) => 
                        <UserBlock key={user.id} user={user} />
                    )
                }
            </div>
        );
    }
}