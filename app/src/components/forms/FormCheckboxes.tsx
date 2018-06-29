import * as React from 'react';
import { Header } from 'semantic-ui-react';
import Checkbox from './FormCheckbox';
import { Danger, Info } from '../messages/Message';

export interface FormCheckboxesProps {
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

  validate = (tag: string) => {
    const errors: any = {};
    if (tag.length > 10) { errors.tag = 'tag is too long'; }
    if (!tag) { errors.tag = 'please enter a tag'; }
    return errors;
}

  public render() {
    const {tags, inOut, toggleCheckbox} = this.props;
    const {errors, addTagValue} = this.state;
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
                    <label>Add your own tag :
                        <input type="text" value={addTagValue} onChange={this.handleChangeAddTag}/>
                    </label>    
                    <input type="submit" value="Add" />
                </form>
            </div> 
        </div>
    );
  }
}
