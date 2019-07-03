import * as React from 'react';
import Discovery from '../discoveryContent/discovery';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import api from '../../services/api';
import Filters from '../Filters';
// const localeIp = '/api';

export interface SearchPageProps {
  isAuth: boolean;
}

interface State {
  filters: any;
  searchResults: any;
  filtersOpened: boolean;
}

class SearchPage extends React.Component<SearchPageProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      filters: undefined,
      searchResults: undefined,
      filtersOpened: true,
    };
  }

  componentWillMount() {
    api.user.getSearchResults(this.state.filters)
      .then((res) => this.setState({searchResults: res}))
      .catch((err) => console.log(err));
  }

  toggleFilters = () => {
    this.setState({
      filtersOpened: !this.state.filtersOpened
    });
  }

  render() {
    const { filtersOpened } = this.state;
    return (
      <div className="main-front">
        <div className="search-main-grid">
          <h1 className="search-titles filters-title"><span onClick={() => this.toggleFilters()}>Filters</span></h1>
          <div className={`main-filters ${filtersOpened && 'main-filters-open'}`}>
            <Filters />
          </div>
          <h1 className="search-titles results-title"><span>Your search results</span></h1>
              {/* <Discovery class="liked-profiles" users={this.state.searchResults} /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isAuth: !!state.user.token
  };
}

export default connect<any, any>(mapStateToProps)(SearchPage);
