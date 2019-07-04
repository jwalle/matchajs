import * as React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface Props {
    values: number[];
    minMax: number[];
    onChange: Function;
    tipFormat: string;
    // fitersOpened: boolean;
}

class CustomSlider extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
      const railStyle = {height: '12px', backgroundColor: '#0b3c5d', borderRadius: 12  };
      const trackStyle = [{height: '12px', backgroundColor: '#d9b310',  borderRadius: 12  }];
      const HandleStyle = [{height: '20px', width: '20px', backgroundColor: '#1d2731', borderColor: 'd9b310' },
      {height: '20px', width: '20px', backgroundColor: '#1d2731', borderColor: 'd9b310' }];
      const {values, minMax, tipFormat} = this.props;
      return (
          <div className="main-slider">
            <p>{values[0]}</p>
            <Range min={minMax[0]} max={minMax[1]}
                defaultValue={values}
                allowCross={false}
                railStyle={railStyle}
                trackStyle={trackStyle}
                handleStyle={HandleStyle}
                onChange={(_values) => this.props.onChange(_values)}
                className="range-slider"/>
            <p>{values[1] + tipFormat}</p>
          </div>
    );
  }
}

export default CustomSlider;