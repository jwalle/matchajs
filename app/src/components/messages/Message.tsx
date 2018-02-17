import * as React from 'react';
import { Alert } from 'react-bootstrap';

interface MessageProps {
    title: string;
    message: string;
    style?: string;
}

const Message: React.SFC<MessageProps> = (props) => {
        return(
        <Alert bsStyle={props.style ? props.style : 'danger'}>
            <h4>{props.title}</h4>
            <p>{props.message}</p>
        </Alert>
    );
};

export default Message;