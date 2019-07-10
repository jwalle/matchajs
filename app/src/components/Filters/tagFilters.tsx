import * as React from 'react';
import * as _ from 'lodash';
import { Header, Loader, Dimmer, Segment } from 'semantic-ui-react';
import Checkbox from '../forms/FormCheckbox';
import { Danger, Info } from '../messages/Message';

export interface FilterTagsProps {
    loading: boolean;
    tags: {
        id: number;
        tag: string;
        in_or_out: string;
        value: boolean;
    }[];
    inOut: string;
    toggleCheckbox: Function;
}

export interface FilterTagsState {
    toggleDisplay: boolean;
}

export default class FilterTags extends React.Component<FilterTagsProps, FilterTagsState> {
    constructor(props: FilterTagsProps) {
        super(props);

        this.state = {
            toggleDisplay: false,
        };
    }

    toggleDisplay = () => {
        this.setState({
            toggleDisplay: !this.state.toggleDisplay,
        });
    }

    public render() {
        const { loading, tags, inOut, toggleCheckbox } = this.props;
        const { toggleDisplay } = this.state;
        const arrows = this.state.toggleDisplay ? '▲' : '▼';
        console.log('loading : ', loading);
        if (!loading) {
            return (
                <div className="filter-tags">
                    <h1 className="search-titles results-title">
                        <span onClick={() => this.toggleDisplay()}>{arrows} {inOut}door tags {arrows}</span>
                    </h1>
                    <div className={`tagBoxes-filters ${toggleDisplay && 'tagBoxes-filters-open'}`}>
                        {tags.map(b =>
                            b.in_or_out === inOut ?
                                <Checkbox key={b.id} box={b} handleCheckboxChange={toggleCheckbox} /> : ''
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <Segment padded>
                    <Loader active />
                </ Segment>
            );
        }
    }
}
