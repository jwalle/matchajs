import * as React from 'react';
import * as formTypes from '../forms/formTypes';
import { Divider, Icon, Container, IconProps, Dropdown } from 'semantic-ui-react';

interface Props {
    user: formTypes.UserProfileProps;
    updateUserTraits: Function; // TODO: DANGEROUS ?
    disabled?: boolean;
}

interface State {
    traits: formTypes.UserTraits;
    traitEdit: any;
}

export default class ProfileBasics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            traits: this.props.user.traits,
            traitEdit: undefined,
        };
    }

    change = (e: any, data: any) => {
        this.setState({
            traits: {
                ...this.state.traits,
                [data.name]: data.value
            }
        });
    }

    changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('TEST', parseInt(e.target.value, 10));
        this.setState({
            traits: {
                ...this.state.traits,
                size: e.target.value
            }
        });
    }

    submitTraits = () => {
        // const newUser = this.props.user;
        // newUser.traits = this.state.traits;
        // updateUserTraits(this.state.traits);
        console.log('PLOP');
        this.props.updateUserTraits(this.state.traits); // TODO: Verif before sending
        // api.user.updateTraits(this.state.traits);
    }

    chooseOption = (i: any) => {
        this.setState({
            traitEdit: undefined,
        });
    }

    render() {
        const { traits }: any = this.state;

        // TODO : find how to add IconProps
        let basics: { id: number, icon: any, key: string, name: string, value: any, options: {}[] }[] = [
            {
                id: 0,
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
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
                id: 7,
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
                id: 8,
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
            }, {
                id: 9,
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
            }
        ];

        const menu = (trait: any) => {
            return (
                <div id="options-menu">
                    {
                        trait.options.map((option: any, i: any) => {
                            return (
                                <div className="flex-col" key={i} onClick={() => this.chooseOption(option.id)}>
                                    <span style={{ justifyContent: 'center' }}>
                                        <h1>{option.text}</h1>
                                    </span>
                                    {/* <Divider hidden={i + 1 === trait.options.length} /> */}
                                </div>
                            );
                        })
                    }
                </div>
            );
        };

        const basicsLenght = basics.length;
        const propsTraits: any = this.props.user.traits;

        const renderTraits = () => (
            <div>
                <h2>About me</h2>
                <Container id="basics">
                    <div style={{ backgroundColor: 'blue' }} />
                    <div className="basicRow">
                        <Icon color="grey" name="resize vertical" />
                        <span className="basicName">Size</span>
                        <div className="basicValue basicSize">
                            <input
                                type="number"
                                value={traits.size}
                                onChange={this.changeSize}
                                maxLength={3} min={50} max={300} />
                            <p>cm</p>
                        </div>
                    </div>
                    <Divider />
                    {basics.map((b: any, i) =>
                        <div key={b.id}>
                            <div className="basicRow" onClick={() => this.setState({ traitEdit: b.id })}>
                                <Icon color="grey" name={b.icon} />
                                <span className="basicName">{b.name}</span>
                                <span className="basicValue">
                                    {b.options[b.value].text}
                                </span>
                            </div>
                            <Divider hidden={i + 1 === basicsLenght} />
                        </div>
                    )}
                    {propsTraits !== traits &&
                        <div className="textAreaButtons">
                            <button className="cancelButton"
                                onClick={() => this.setState({ traits: propsTraits })}>Cancel</button>
                            <button className="saveButton" onClick={this.submitTraits}>Save</button>
                        </div>
                    }
                </ Container>
            </div>

        );

        const { traitEdit } = this.state;
        console.log('traitEdit:', traitEdit);
        if (traitEdit === undefined) {
            return renderTraits();
        } else {
            return menu(basics[traitEdit]);
        }

    }
}
