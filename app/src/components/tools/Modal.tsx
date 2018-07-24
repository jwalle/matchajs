import * as React from 'react';

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