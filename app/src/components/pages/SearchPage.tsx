import * as React from 'react';
import Discovery from '../discoveryContent/discovery';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import api from '../../services/api';
import Filters from '../Filters';
import UserBlock from '../discoveryContent/UserBlock';
import LoadingPage from './LoadingPage';
// const localeIp = '/api';

export interface SearchPageProps {
  isAuth: boolean;
}

interface State {
  filters: {
    age: number[],
    location: number,
    popularity: number[],
    tags: number[],
  };
  loading: boolean;
  searchResults: any;
  filtersOpened: boolean;
}

class SearchPage extends React.Component<SearchPageProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      filters: {
        age: [],
        location: 0,
        popularity: [],
        tags: [],
      },
      loading: true,
      searchResults: undefined,
      filtersOpened: false,
    };
  }

  componentWillMount() {
    api.user.getSearchResults(this.state.filters)
      .then((res) => this.setState({ searchResults: res, loading: false }))
      .catch((err) => console.log(err));
  }

  toggleFilters = () => {
    this.setState({
      filtersOpened: !this.state.filtersOpened
    });
  }

  render() {
    const { filtersOpened, searchResults, loading } = this.state;
    const arrows = this.state.filtersOpened ? '▲' : '▼';
    return (
      <div className="main-front">
        <div className="search-main-grid">
          <h1 className="search-titles filters-title"><span onClick={() => this.toggleFilters()}>
            {arrows} Filters  {arrows}
          </span></h1>
          <div className={`main-filters ${filtersOpened && 'main-filters-open'}`}>
            <Filters />
          </div>
          <h1 className="search-titles results-title"><span>Your search results</span></h1>
          <div className="search-results-container">
            <div className="search-results">
              {
                loading ? <LoadingPage /> :
                searchResults && searchResults.map((result: any) =>
                  <UserBlock key={result.id} user={result} />
                )
              }
            </div>
          </div>
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
