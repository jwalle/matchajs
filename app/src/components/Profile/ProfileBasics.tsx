import * as React from 'react';
import * as formTypes from '../forms/formTypes';
import { Divider, Icon, Container, IconProps } from 'semantic-ui-react';

export interface ProfileBasicsProps {
    user: formTypes.UserData;
}

export default class ProfileBasics extends React.Component<ProfileBasicsProps, {}> {
    constructor(props: ProfileBasicsProps) {
        super(props);
    }

    render() {
        const user = this.props.user;
        const { traits } = user;

        // TODO : find how to add IconProps
        let basics: { id: number, icon: any, key: string, name: string, value: any, options: {}[] }[] = [
            {
                id: 1,
                icon: 'intergender',
                name: 'Orientation',
                key: 'orientation',
                value: traits.orientation,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Straight' },
                    { key: 2, value: 2, text: 'Gay' },
                    { key: 3, value: 3, text: 'Bisexuel' },
                ]
            }, {
                id: 11,
                icon: 'star',
                name: 'Sign',
                key: 'sign',
                value: traits.sign,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Aquarius' },
                    { key: 2, value: 2, text: 'Pisces' },
                    { key: 3, value: 3, text: 'Aries' },
                    { key: 4, value: 4, text: 'Taurus' },
                    { key: 5, value: 5, text: 'gemini' },
                    { key: 6, value: 6, text: 'Cancer' },
                    { key: 7, value: 7, text: 'Leo' },
                    { key: 8, value: 8, text: 'Virgo' },
                    { key: 9, value: 9, text: 'Libra' },
                    { key: 10, value: 10, text: 'Scorpio' },
                    { key: 11, value: 11, text: 'Sagittarius' },
                    { key: 12, value: 12, text: 'Capricorn' },
                ]
            }, {
                id: 2,
                icon: 'child',
                name: 'Kid(s)',
                key: 'kids',
                value: traits.kids,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Sometimes' },
                    { key: 2, value: 2, text: 'None' },
                ]
            }, {
                id: 3,
                icon: 'users',
                name: 'Status',
                key: 'status',
                value: traits.status,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Single' },
                    { key: 2, value: 2, text: 'Seeing Someone' },
                    { key: 3, value: 3, text: 'Married' },
                    { key: 4, value: 4, text: 'Open Relationship' },
                ]
            }, {
                id: 4,
                icon: 'smile',
                name: 'Ethnicity',
                key: 'ethnicity',
                value: traits.ethnicity,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Asian' },
                    { key: 2, value: 2, text: 'Indian' },
                    { key: 3, value: 3, text: 'Caucasian' },
                    { key: 4, value: 4, text: 'Black' },
                    { key: 5, value: 5, text: 'Hispanic' },
                    { key: 6, value: 6, text: 'Other' },
                ]
            }, {
                id: 6,
                icon: 'game',
                name: 'Religion',
                key: 'religion',
                value: traits.religion,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Atheism' },
                    { key: 2, value: 2, text: 'Gay' },
                    { key: 3, value: 3, text: 'Judaism' },
                    { key: 4, value: 4, text: 'Islam' },
                    { key: 5, value: 5, text: 'Other' },
                ]
            }, {
                id: 7,
                icon: 'leaf',
                name: 'Smoke',
                key: 'smoke',
                value: traits.smoke,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Yes' },
                    { key: 2, value: 2, text: 'No' },
                    { key: 3, value: 3, text: 'Sometimes' },
                ]
            }, {
                id: 8,
                icon: 'bar',
                name: 'Drink',
                key: 'drink',
                value: traits.drink,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Yes' },
                    { key: 2, value: 2, text: 'No' },
                    { key: 3, value: 3, text: 'Sometimes' },
                ]
            }, {
                id: 9,
                icon: 'tree',
                name: 'Drugs',
                key: 'drugs',
                value: traits.drugs,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Yes' },
                    { key: 2, value: 2, text: 'No' },
                    { key: 3, value: 3, text: 'Sometimes' },
                ]
            }, {
                id: 10,
                icon: 'food',
                name: 'Diet',
                key: 'diet',
                value: traits.diet,
                options: [
                    { key: 0, value: 0, text: '...' },
                    { key: 1, value: 1, text: 'Omnivore' },
                    { key: 2, value: 2, text: 'Vegetarian' },
                    { key: 3, value: 3, text: 'Vegan' },
                ]
            }
        ];

        const basicsLength = basics.length;
        console.log(basicsLength);
        return (
            <Container id="basics">
                {basics.map((b: any, i) =>
                    <div key={b.id}>
                        <div className="basicRow">
                            <Icon size="big" color="grey" name={b.icon} />
                            <span className="basicName">{b.name}</span>
                            <span className="basicValue">
                                {b.options[b.value].text}
                            </span>
                        </div>
                        <Divider hidden={i + 1 === basicsLength} />
                    </div>
                )}
            </ Container>
        );
    }
}
