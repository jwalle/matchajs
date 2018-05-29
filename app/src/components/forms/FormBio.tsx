import { Form, FormGroup, Button, Dropdown, Container, Icon } from 'semantic-ui-react';
import * as React from 'react';
import Danger from '../messages/Message';
import * as formTypes from './formTypes';

export interface FormBioProps {
    updateBio: Function;
    bioTitle: string;
    bioID: string;
    data: formTypes.UserData;
}

export interface FormNameState {
    data: formTypes.UserData;
    editBio: boolean;
}

export default class FormBio extends React.Component < FormBioProps, FormNameState > {
    constructor(props: FormBioProps) {
        super(props);
        this.state = {
            data: {
                ...this.props.data
            },
            editBio: false
        };
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillReceiveProps(nextProps: FormBioProps) {
        this.setState({
            data: {
                ...nextProps.data
            }
        });
    }

    toggleEditBio = () => {
        this.setState({editBio: !this.state.editBio});
    }

    async onSelect(e: any) {
        await this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        }); 
    }

    onSubmit = () => {
        this.toggleEditBio();
        this.props.updateBio(this.state.data);   
    }

    render() {
        const { data } = this.state;
        const key = this.props.bioID;
        const textValue = data[key];
        // const { errors } = this.props;

        const text = (
             <Container onClick={this.toggleEditBio} id="textAreaEdit">
                <p>{textValue ? textValue : 'Please add more info...'}</p>
            </Container>
        );

        return (
            <div id="textOne">
                <h3>{this.props.bioTitle}</h3>            
                {!this.state.editBio ?
                (text) : (
                <Form>
                    <Form.TextArea
                        value={textValue}
                        placeholder="describe yourself !"
                        autoComplete="off"
                        name={this.props.bioID}
                        onChange={this.onSelect}
                    />
                    <Button color="green" onClick={this.onSubmit} type="button">
                        <Icon name="checkmark" /> Update
                    </ Button>
                    <Button color="grey" onClick={this.toggleEditBio} type="button">
                        Cancel
                    </ Button>                    
                </Form>)}
            </div>
        );
    }
}
