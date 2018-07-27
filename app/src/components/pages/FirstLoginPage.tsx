import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Danger from '../messages/Message';
import Checkboxes from '../forms/FormCheckboxes';
import PhotoUploadForm from '../forms/photoUploadForm';
import { getAllTags, addNewTag, ADD_NEW_TAG } from '../state/actions/tags';
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';

interface FirstLoginProps {
    isConfirmed: boolean;
    getAllTags: Function;
    addNewTag: Function;
    tags: {
        id: number;
        tag: string;
        in_or_out: string;
        value: boolean;
    }[];
    tag: any; // TODO
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

export class FirstLogin extends React.Component <FirstLoginProps, FirstLoginState> {
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
        this.props.getAllTags();
    }

    // getTags = () => {
    //     let self = this;
    //     this.props.getAllTags()
    //         .then((res: any) => {
    //             console.log(res.data);
    //             self.setState({
    //                 data: {
    //                     tags: res.data
    //                 }
    //             });
    //         })
    //         .catch((err: any) => console.log('error axios getTags :', err));
    // }

    // insertNewTag = (tag: string, inOrOut: string, id: number) => {
    //     let newTags = this.props.tags;
    //     newTags.push({
    //         id: id,
    //         tag: tag,
    //         in_or_out: inOrOut,
    //         value: true
    //     });
    //     this.setState({
    //         data: {
    //             tags: newTags
    //         }
    //     });
    // }

    // addTag = (newTag: string, inOrOut: string) => {
    //     let self = this;
    //     axios({
    //         method: 'post',
    //         url: '/api/tags/addTag',
    //         data: {
    //             newTag: newTag,
    //             inOrOut: inOrOut
    //         }
    //     })
    //     .then(res => {
    //         if (res.status === 200) {
    //             let id = res.data.insertID;
    //             self.insertNewTag(newTag, inOrOut, id);
    //         }
    //     })
    //     .catch(err => console.log('error axios getTags :', err));
    // }

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
        const tags = this.props.tags;
        return(
          <main id="mainFirstLogin">
            <div id="PhotoUpload">
                <PhotoUploadForm />
            </div>
            {/* <form> */}
            {errors.global && <Danger title="Global error" text="Something went wrong" />}
        <Checkboxes inOut="in" tags={tags} toggleCheckbox={this.toggleCheckbox} submitNewTag={this.props.addNewTag} />
        <Checkboxes inOut="out" tags={tags} toggleCheckbox={this.toggleCheckbox} submitNewTag={this.props.addNewTag} />
                <Button color="green" onClick={this.onSubmit}>
                    <Icon name="checkmark" /> Confirm
                    </ Button>
                    <Button color="grey" onClick={this.handleClose}>
                        No thanks
                </ Button>
            {/* </form> */}
          </main>
        );
    }
}

const mapStateToProps = (state: any) => ({
    tags: state.tags.items,
    isConfirmed: !!state.user.confirmed
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({addNewTag, getAllTags}, dispatch);
};

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(FirstLogin);