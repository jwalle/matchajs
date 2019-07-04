import * as React from 'react';
import CustomSlider from './CustomSlider';

export interface Props {
    // fitersOpened: boolean;
}

interface State {
  ageRange: number[];
  popRange: number[];
  locRange: number[];
}

class Filters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      ageRange: [22, 44],
      popRange: [10, 90],
      locRange: [1, 20],
    };
  }

  onChangeAge = (values: number[]) => {
    this.setState({ageRange: values});
  } 

  onChangePop = (values: number[]) => {
    this.setState({popRange: values});
  } 

  onChangeLoc = (values: number[]) => {
    this.setState({locRange: values});
  } 

  render() {
      const {ageRange, popRange, locRange} = this.state;
      return (
      <div id="filter-box">
        <div className="filter-slider">
          <h3>Son âge</h3>
          <CustomSlider minMax={[18, 99]} values={ageRange} tipFormat=" ans" onChange={this.onChangeAge} />
        </div>
        <div className="filter-slider">
          <h3>Sa popularite</h3>
          <CustomSlider minMax={[0, 100]} values={popRange} tipFormat=" %" onChange={this.onChangePop} />
        </div>
        <div className="filter-slider">
          <h3>Sa distance</h3>
          <CustomSlider minMax={[1, 1000]} values={locRange} tipFormat=" km" onChange={this.onChangeLoc} />
        </div>
      </div>
    );
  }
}

export default Filters;

// INTERVAL age
// INTERVAL score popularite
// Localisation
// Tags