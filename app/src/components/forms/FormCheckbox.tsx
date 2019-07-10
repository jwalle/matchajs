import * as React from 'react';

export interface CheckboxFormProps {
  box: {
    id: number;
    tag: string;
    value: boolean;
  };
  handleCheckboxChange: Function;
}

export interface CheckboxFormState {
  isChecked: boolean;
}

export default class CheckboxForm extends React.Component<CheckboxFormProps, CheckboxFormState> {
  constructor(props: CheckboxFormProps) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.box.value });
  }

  toggleCheckbox = () => {
    const { tag } = this.props.box;
    this.setState({ isChecked: !this.state.isChecked });
    this.props.handleCheckboxChange(tag);
  }

  public render() {
    const { id, tag } = this.props.box;
    const isChecked = this.state.isChecked;

    return (
      <label key={id} className="container-tag-box">
        {tag}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={this.toggleCheckbox}
        />
        <span className="checkmark-tag"></span>
      </label>
    );
  }
}
