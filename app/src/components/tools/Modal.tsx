import * as React from 'react';
require('../styles/modal.css');

interface ModalProps {
    show: boolean;
}

export default class Modal extends React.Component<ModalProps> {
    render() {
        if (!this.props.show) {
            return null;
        }

        return(
            <div className="backdrop">
                    {this.props.children}
            </div>
        );
    }
}