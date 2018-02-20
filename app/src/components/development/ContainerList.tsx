import * as React from 'react';
import { ContainerProps } from './containerListItem';
import  ContainerListItem from './containerListItem';
import { Card } from 'semantic-ui-react';

export interface ContainerListProps {
    title?: string;
    containers: ContainerProps[];
}

export default class ContainerList extends React.Component<ContainerListProps> {
  render() {
    return (
      <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.containers.length === 0 ? 'No containers to show' : ''}</p>
          <Card.Group>
            {this.props.containers.map(c => <ContainerListItem key={c.name} {...c} />)}
          </Card.Group>
      </div>
    );
  }
}
