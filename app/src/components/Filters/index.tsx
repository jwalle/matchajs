import * as React from 'react';
import CustomSlider from './CustomSlider';
import api from '../../services/api';
import FilterTags from './tagFilters';
import CustomDistRange from './CustomDistRange';

export interface Props {
  // fitersOpened: boolean;
}

interface State {
  ageRange: number[];
  popRange: number[];
  locRange: number;
  tags: any;
  loading: boolean;
  inOpen: boolean;
  outOpen: boolean;
}

class Filters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      ageRange: [22, 44],
      popRange: [10, 90],
      locRange: 20,
      tags: undefined,
      loading: true,
      inOpen: true,
      outOpen: true,
    };
  }

  componentWillMount() {
    api.tags.getTags()
      .then(tags => this.setState({ tags, loading: false }));
  }

  onChangeAge = (values: number[]) => {
    this.setState({ ageRange: values });
  }

  onChangePop = (values: number[]) => {
    this.setState({ popRange: values });
  }

  onChangeLoc = (value: number) => {
    this.setState({ locRange: value });
  }

  toggleCheckbox = (tag: string) => {
    let { tags } = this.state;
    // let newState = Object.assign({}, this.state.data);
    let index = tags.findIndex((x: any) => x.tag === tag);
    if (index === -1) {
      console.error('ERROR: this index does not exist');
    } else {
      // this.props.toggleTag(index);
    }
  }

  render() {
    const { ageRange, popRange, locRange, tags, loading, inOpen, outOpen } = this.state;
    console.log('tags :', tags);
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
          <CustomDistRange value={locRange} tipFormat=" km" onChange={this.onChangeLoc} />
        </div>
        <div className="filter-tags">
          <FilterTags
            inOut="in"
            loading={loading}
            tags={tags}
            toggleCheckbox={this.toggleCheckbox} />
          <FilterTags
            inOut="out"
            loading={loading}
            tags={tags}
            toggleCheckbox={this.toggleCheckbox} />
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