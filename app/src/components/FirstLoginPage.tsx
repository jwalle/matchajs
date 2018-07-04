import * as React from 'react';
import { connect } from 'react-redux';
import Danger from './messages/Message';
import Checkbox from './forms/FormCheckbox';
import Checkboxes from './forms/FormCheckboxes';
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react';
require('./styles/FirstLogin.css');
import axios from 'axios';

interface FirstLoginProps {
    isConfirmed: boolean;
}

interface FirstLoginState {
    loading: boolean;
    errors: {
        global: string;
    };
    data: {
        tags: {
            id: number;
            tag: string;
            in_or_out: string;
            value: boolean;
        }[];
    };
}

class FirstLogin extends React.Component <FirstLoginProps, FirstLoginState> {
    constructor(props: FirstLoginProps) {
        super(props);

        this.state = {
            loading: false,
            errors: {
                global: ''
            },
            data: {
                tags: [],
            }
        };
        this.toggleCheckbox = this.toggleCheckbox.bind(this);        
    }

    componentWillMount() {
        this.getTags();
    }

    getTags = () => {
        let self = this;
        axios({
            method: 'get',
            url: '/api/tags/getAll',
            responseType: 'json'
        })
            .then(res => {
                console.log(res.data);
                self.setState({
                    data: {
                        tags: res.data
                    }
                });
            })
            .catch(err => console.log('error axios getTags :', err));
    }

    addTag = (newTag : string, inOrOut: string) => {
        let self = this;
        axios({
            method: 'post',
            url: '/api/tags/addTag',
            responseType: 'json',
            data: {
                newTag: newTag,
                inOrOut: inOrOut
            }
        })
        .catch(err => console.log('error axios getTags :', err));
    }

    toggleCheckbox(tag: string) {
        let newState = Object.assign({}, this.state.data);
        let index = this.state.data.tags.findIndex(x => x.tag === tag);
        if (index === -1) {
            console.error('ERROR: this index does not exist');
        } else {
            newState.tags[index].value = !this.state.data.tags[index].value;
            this.setState({data: newState});
        }
    }

    submitNewTag = (value: string, inOut: string) => {
        this.addTag(value, inOut);
    }

    handleClose = () => {
        console.log('close this'); // TODO
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        // this.setState({loading: true});
        console.log('DATA SUBMITTED: ', this.state.data);
        // this.submit(this.state.data);
    }

    render() {
        const {data, errors, loading} = this.state;
        const tags = data.tags;

        return(
          <main id="mainFirstLogin">
            <form>
            {errors.global && <Danger title="Global error" text="Something went wrong" />}
            <Checkboxes inOut="in" tags={tags} toggleCheckbox={this.toggleCheckbox} submitNewTag={this.submitNewTag} />
            <Checkboxes inOut="out" tags={tags} toggleCheckbox={this.toggleCheckbox} submitNewTag={this.submitNewTag} />
                <Button color="green" onClick={this.onSubmit}>
                    <Icon name="checkmark" /> Confirm
                    </ Button>
                    <Button color="grey" onClick={this.handleClose}>
                        No thanks
                </ Button>
            </form>
          </main>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        isConfirmed: !!state.user.confirmed
    };
}

export default connect<{}, any>(mapStateToProps, { })(FirstLogin);