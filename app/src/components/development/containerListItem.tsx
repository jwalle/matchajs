import * as React from 'react';
import { Button, Card } from 'semantic-ui-react';

export interface ContainerProps {
    name: string;
    image: string;
    state: string;
    status: string;
}

export default class ContainerListItem extends React.Component<ContainerProps, {}> {

    isRunning() {
        return this.props.state === 'running';
    }

  render() {
    const color = this.isRunning() ? 'green' : 'red';

    return (
      <Card color={color}>
      <Card.Content>
        <Card.Header> {this.props.name} </Card.Header>
        <Card.Meta> {this.props.image} </Card.Meta>
        <Card.Description> {this.props.status} </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button basic>Start</Button>
        </Card.Content>
      </Card>
    );
  }
}