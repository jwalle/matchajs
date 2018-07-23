import * as React from 'react';
import { connect } from 'react-redux';
import Danger from './messages/Message';
import Checkboxes from './forms/FormCheckboxes';
import PhotoUploadForm from './forms/photoUploadForm';
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

    insertNewTag = (tag: string, inOrOut: string, id: number) => {
        let newTags = this.state.data.tags;
        newTags.push({
            id: id,
            tag: tag,
            in_or_out: inOrOut,
            value: true
        });
        this.setState({
            data: {
                tags: newTags
            }
        });
    }

    addTag = (newTag: string, inOrOut: string) => {
        let self = this;
        axios({
            method: 'post',
            url: '/api/tags/addTag',
            data: {
                newTag: newTag,
                inOrOut: inOrOut
            }
        })
        .then(res => {
            if (res.status === 200) {
                let id = res.data.insertID;
                self.insertNewTag(newTag, inOrOut, id);
            }
        })
        .catch(err => console.log('error axios getTags :', err));
    }

    toggleCheckbox = (tag: string) => {
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

    setTagApi = (tagId: number, userId: number) => {
        axios.post('/api/tags/setTag', {tagId, userId}).then(res => res.data.user);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        let userId = 1;
        let tags = this.state.data.tags;
        tags.forEach((tag) => {
            if (tag.value === true) {
                console.log(tag.tag);
                this.setTagApi(tag.id, userId);
            }
        });
        // this.setState({loading: true});
        console.log('DATA SUBMITTED: ', this.state.data);
        // this.submit(this.state.data);
    }

    render() {
        const {data, errors, loading} = this.state;
        const tags = data.tags;

        return(
          <main id="mainFirstLogin">
            <div id="PhotoUpload">
                <PhotoUploadForm />
            </div>
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