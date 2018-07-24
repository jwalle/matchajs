import * as React from 'react';
import * as _ from 'lodash';
import { ContainerProps } from './containerListItem';
import ContainerList from './ContainerList';

interface Appstate {
    containers: ContainerProps[];
    stoppedContainers: ContainerProps[];
}

export default class DevPage extends React.Component<{}, Appstate> {

    containers: ContainerProps[] = [
        {
            name: 'test container',
            image: 'some image',
            state: 'running',
            status: 'Running'
        },
        {
            name: 'another test container',
            image: 'some image',
            state: 'stopped',
            status: 'Running'
        }
    ];

    constructor() {
        super({});

        const partitioned = _.partition(this.containers, c => c.state === 'running');

        this.state = {
            containers: partitioned[0],
            stoppedContainers: partitioned[1]
        };
    }

    render() {
        return(
        <div className="ui container">
            <h1>Docker Dashboard</h1>
            <ContainerList title="Running" containers={this.state.containers} />
            <ContainerList title="Stopped containers" containers={this.state.stoppedContainers} /> 
        </div>
    );
    }
}