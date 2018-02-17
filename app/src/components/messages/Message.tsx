import * as React from 'react';
import { Message } from 'semantic-ui-react';

interface MessageProps {
    title: string;
    text: string;
}

export const Danger: React.SFC<MessageProps> = (props) => {
        return(
        <Message negative>
            <Message.Header>{props.title}</Message.Header>
            <p>{props.text}</p>
        </Message>);
        };

export const Info: React.SFC<MessageProps> = (props) => {
            return(
            <Message info>
                <Message.Header>{props.title}</Message.Header>
                <p>{props.text}</p>
            </Message>);
            };
    
export default Danger;