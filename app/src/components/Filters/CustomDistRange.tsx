import * as React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface Props {
  value: number;
  onChange: Function;
  tipFormat: string;
}

class CustomDistRange extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const railStyle = { height: '12px', backgroundColor: '#0b3c5d', borderRadius: 12 };
    const trackStyle = [{ height: '12px', backgroundColor: '#d9b310', borderRadius: 12 }];
    const HandleStyle = [{ height: '20px', width: '20px', backgroundColor: '#1d2731', borderColor: 'd9b310' }];
    const { value, tipFormat } = this.props;
    return (
      <div className="main-slider">
        <p>0</p>
        <Slider
          defaultValue={value}
          min={1}
          max={200}
          railStyle={railStyle}
          trackStyle={trackStyle}
          handleStyle={HandleStyle}
          onChange={(_value: any) => this.props.onChange(_value)}
          className="range-slider" />
        <p>{value + tipFormat}</p>
      </div>
    );
  }
}

export default CustomDistRange;