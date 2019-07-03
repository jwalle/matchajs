import * as React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface Props {
    // fitersOpened: boolean;
}

interface State {
  values: number[];
}

class Filters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      values: [22, 44],
    };
  }

  render() {
      // const {fitersOpened} = this.props;
      const railStyle = {height: '12px', backgroundColor: '#0b3c5d', borderRadius: 12  };
      const trackStyle = [{height: '12px', backgroundColor: '#d9b310',  borderRadius: 12  }];
      const HandleStyle = [{height: '20px', width: '20px', backgroundColor: '#1d2731', borderColor: 'd9b310' },
      {height: '20px', width: '20px', backgroundColor: '#1d2731', borderColor: 'd9b310' }];
      const {values} = this.state;
      return (
      <div id="filter-box">
        <div className="fiter-age">
        <h3>Son âge</h3>
          <div className="age-slider">
            <p>{values[0]}</p>
            <Range min={18} max={99}
                defaultValue={[22, 40]}
                tipFormatter={(value: any) => `${value} ans`}
                allowCross={false}
                railStyle={railStyle}
                trackStyle={trackStyle}
                handleStyle={HandleStyle}
                onChange={(_values) => this.setState({values: _values})}
                className="range-slider"/>
            <p>{values[1]}</p>
          </div>
        </div>
          <h1>PLOP</h1>
          <h1>PLOP</h1>
          <h1>PLOP</h1>
          <h1>PLOP</h1>
      </div>
    );
  }
}

export default Filters;

// INTERVAL age
// INTERVAL score popularite
// Localisation
// Tags