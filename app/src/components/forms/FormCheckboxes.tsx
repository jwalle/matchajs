import * as React from 'react';
import * as _ from 'lodash';
import { Header, Loader, Dimmer, Segment } from 'semantic-ui-react';
import Checkbox from './FormCheckbox';
import { Danger, Info } from '../messages/Message';

export interface FormCheckboxesProps {
    loading: boolean;
    tags: {
        id: number;
        tag: string;
        in_or_out: string;
        value: boolean;
    }[];
    inOut: string;
    toggleCheckbox: Function;
    submitNewTag: Function;
}

export interface FormCheckboxesState {
    addTagValue: string;
    errors: {
        tag: string;
    };
}

export default class FormCheckboxes extends React.Component<FormCheckboxesProps, FormCheckboxesState> {
  constructor(props: FormCheckboxesProps) {
    super(props);

    this.state = {
        addTagValue: '',
        errors: {
            tag: ''
        }
    };
  }

  handleChangeAddTag = (e: any) => {
      this.setState({addTagValue: e.target.value});
  }

  handleSubmit = (e: any) => {
      e.preventDefault();
      const errors: any = this.validate(this.state.addTagValue);
      this.setState({ errors });
      if (Object.keys(errors).length === 0 ) {
        this.props.submitNewTag(this.state.addTagValue, this.props.inOut);
        this.setState({addTagValue: ''});
      }
  }

  tagExist = (tag: string): boolean => {
    if (_.find(this.props.tags, {tag: tag})) {
        return true;
    }
    return false;
  }

  validate = (tag: string) => {
    const errors: any = {};
    if (tag.length > 10) { errors.tag = 'tag is too long'; }
    if (!tag) { errors.tag = 'please enter a tag'; }
    if (this.tagExist(tag)) { errors.tag = 'this tag already exist !'; }
    return errors;
}

  public render() {
    const {loading, tags, inOut, toggleCheckbox} = this.props;
    const {errors, addTagValue} = this.state;
    console.log('loading : ', loading);
    if (!loading) {
        return (
            <div className="tags">
                <Header as="h2">Your {inOut}door activity :</Header>
                <div id="tagBoxes">
                    {tags.map(b =>
                        b.in_or_out === inOut ?
                        <Checkbox key={b.id} box={b} handleCheckboxChange={toggleCheckbox}/> : ''
                    )}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    {errors.tag && <Danger title="tag" text={errors.tag} />}
                            <input
                                type="text"
                                placeholder="Add your own !"
                                className="tagTextInput"
                                value={addTagValue}
                                onChange={this.handleChangeAddTag}
                            />
                            <input
                                type="submit"
                                value="+"
                                className="addTagButton"
                            />
                    </form>
                </div> 
            </div>
    );
    } else {
        return (
            <Segment padded>
                <Loader active />
            </ Segment>
    );
    }
  }
}
