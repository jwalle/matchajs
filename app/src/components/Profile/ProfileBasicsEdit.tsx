import * as React from 'react';
import * as formTypes from '../forms/formTypes';
import { Divider, Icon, Container, IconProps, Dropdown } from 'semantic-ui-react';

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
                return ('Straight');
            }
            if (user.orientation === 'g') {
                return ('Gay');
            }
            if (user.orientation === 'b') {
                return ('Bisexual');
            }
            return ('...');
        };

        console.log('smoke: ', user.smoke);

        // TODO : find how to add IconProps
        let basics: { id: number, icon: any, name: string, defaultValue: string, options: {}[] }[] = [
            {
                id: 1,
                icon: 'intergender',
                name: 'Orientation',
                defaultValue: orientation(),
                options: [
                    { key: 0, value: 'Straight', text: 'Straight' },
                    { key: 1, value: 'Gay', text: 'Gay' },
                    { key: 2, value: 'Bi', text: 'Bisexuel' },
                ]
            }, {
                id: 2,
                icon: 'child',
                name: 'Kid(s)',
                defaultValue: user.kids ? 'Yes' : 'None',
                options: [
                    { key: 0, value: 'Yes', text: 'Sometimes' },
                    { key: 1, value: 'None', text: 'None' },
                ]
            }, {
                id: 3,
                icon: 'users',
                name: 'Status',
                defaultValue: user.status,
                options: [
                    { key: 0, value: 'Single', text: 'Single' },
                    { key: 1, value: 'Seeing Someone', text: 'Seeing Someone' },
                    { key: 2, value: 'Married', text: 'Married' },
                    { key: 3, value: 'Open Relationship', text: 'Open Relationship' },
                ]
            }, {
                id: 4,
                icon: 'smile',
                name: 'Ethnicity',
                defaultValue: user.ethnicity,
                options: [
                    { key: 0, value: 'Asian', text: 'Asian' },
                    { key: 1, value: 'Indian', text: 'Indian' },
                    { key: 2, value: 'Caucasian', text: 'Caucasian' },
                    { key: 3, value: 'Black', text: 'Black' },
                    { key: 4, value: 'Hispanic', text: 'Hispanic' },
                    { key: 5, value: 'Other', text: 'Other' },
                ]
            }, {
                id: 6,
                icon: 'game',
                name: 'Religion',
                defaultValue: user.religion,
                options: [
                    { key: 0, value: 'Atheism', text: 'Atheism' },
                    { key: 1, value: 'Christianity', text: 'Gay' },
                    { key: 2, value: 'Judaism', text: 'Judaism' },
                    { key: 3, value: 'Islam', text: 'Islam' },
                    { key: 4, value: 'Other', text: 'Other' },
                ]
            }, {
                id: 7,
                icon: 'leaf',
                name: 'Smoke',
                defaultValue: user.smoke,
                options: [
                    { key: 0, value: 'Yes', text: 'Yes' },
                    { key: 1, value: 'No', text: 'No' },
                    { key: 2, value: 'Sometimes', text: 'Sometimes' },
                ]
            }, {
                id: 8,
                icon: 'bar',
                name: 'Drink',
                defaultValue: user.drink,
                options: [
                    { key: 0, value: 'Yes', text: 'Yes' },
                    { key: 1, value: 'No', text: 'No' },
                    { key: 2, value: 'Sometimes', text: 'Sometimes' },
                ]
            }, {
                id: 9,
                icon: 'tree',
                name: 'Drugs',
                defaultValue: user.drugs,
                options: [
                    { key: 0, value: 'Yes', text: 'Yes' },
                    { key: 1, value: 'No', text: 'No' },
                    { key: 2, value: 'Sometimes', text: 'Sometimes' },
                ]
            }, {
                id: 10,
                icon: 'food',
                name: 'Diet',
                defaultValue: user.diet,
                options: [
                    { key: 0, value: 'Omnivore', text: 'Omnivore' },
                    { key: 1, value: 'Vegetarian', text: 'Vegetarian' },
                    { key: 2, value: 'Vegan', text: 'Vegan' },
                ]
            }, {
                id: 11,
                icon: 'star',
                name: 'Sign',
                defaultValue: user.sign,
                options: [
                    { key: 0, value: 'Aquarius', text: 'Aquarius' },
                    { key: 1, value: 'Pisces', text: 'Pisces' },
                    { key: 2, value: 'Aries', text: 'Aries' },
                    { key: 3, value: 'Taurus', text: 'Taurus' },
                    { key: 4, value: 'gemini', text: 'gemini' },
                    { key: 5, value: 'Cancer', text: 'Cancer' },
                    { key: 6, value: 'Leo', text: 'Leo' },
                    { key: 7, value: 'Virgo', text: 'Virgo' },
                    { key: 8, value: 'Libra', text: 'Libra' },
                    { key: 9, value: 'Scorpio', text: 'Scorpio' },
                    { key: 10, value: 'Sagittarius', text: 'Sagittarius' },
                    { key: 11, value: 'Capricorn', text: 'Capricorn' },
                ]
            }
        ];

        const basicsLenght = basics.length;
        console.log(user);
        return (
            <Container id="basics">
                {basics.map((b, i) =>
                    <div key={b.id}>
                        <div className="basicRow">
                            <Icon size="big" color="grey" name={b.icon} />
                            <span className="basicName">{b.name}</span>
                            <Dropdown inline className="basicValue" options={b.options} defaultValue={b.defaultValue} />
                        </div>
                        <Divider hidden={i + 1 === basicsLenght} />
                    </div>
                )}
                <div className="textAreaButtons">
                    <button className="cancelButton" onClick={() => console.log('test')}>Cancel</button>
                    <button className="saveButton">Save</button>
                </div>
            </ Container>
        );
    }
}
