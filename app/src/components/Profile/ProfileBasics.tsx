import * as React from 'react';
import * as formTypes from '../forms/formTypes';
import { Divider, Icon, Container, IconProps } from 'semantic-ui-react';
require('../styles/profilePage.css');

export interface ProfileBasicsProps {
    user: formTypes.UserData;
}

export default class ProfileBasics extends React.Component<ProfileBasicsProps, {}> {
    constructor(props: ProfileBasicsProps) {
        super(props);
    }

    render() {
        const user = this.props.user;

        const orientation = () => {
            if (user.orientation === 's') {
                return('Straight');
            }
            if (user.orientation === 'g') {
                return('Gay');
            }
            if (user.orientation === 'b') {
                return('Bisexual');
            }
        };

        // TODO : find how to add IconProps
        let basics: { id: number, icon: any, name: string, value: string}[] = [
            {id: 1, icon: 'intergender', name: 'Orientation', value: orientation()},
            {id: 2, icon: 'child', name: 'Kids', value: user.kids ? user.kids + 'child(s)' : 'None'},
            {id: 3, icon: 'users', name: 'Status', value: user.status},
            {id: 4, icon: 'smile', name: 'Ethnicity', value: user.ethnicity},
            {id: 5, icon: 'resize vertical', name: 'Size', value: user.size + ' cm'},
            {id: 6, icon: 'game', name: 'Religion', value: user.religion},
            {id: 7, icon: 'leaf', name: 'Smoke', value: user.smoke},
            {id: 8, icon: 'bar', name: 'Drink', value: user.drink},
            {id: 9, icon: 'tree', name: 'Drugs', value: user.drugs},
            {id: 10, icon: 'food', name: 'Diet', value: user.diet}
        ];

        return (
            <Container id="basics">
                {basics.map(b =>
                    <div key={b.id}>
                        <div className="basicRow">
                            <Icon size="big" color="grey" name={b.icon} />
                            <span className="basicName">{b.name}</span>
                            <span className="basicValue">
                                {b.value ? b.value : '...'}
                            </span>
                        </div>
                        <Divider />
                    </div>
                )}
            </ Container>
        );
    }
}
