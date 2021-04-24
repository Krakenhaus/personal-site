import React, { useEffect } from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import Menu from './components/Menu';
import Creatures from './components/Creatures';
import { defaultSort } from './utils/sort';
import './animalcrossing.css';

function AnimalCrossing() {
  
  useEffect(() => {
    document.body.classList.add('animal-crossing-body');

    return () => {
      document.body.classList.remove('animal-crossing-body');
    }
  });

  const [state, setState] = React.useState({
    filters: [],
    search: '',
    sort: defaultSort(),
    pageName: 'Fish'
  });
  const { filters, search, sort, pageName } = state;
  const onUpdatePage = (newPage) => {
      setState({ ...state, pageName: newPage });
  };

  const onChangeFilters = (newFilters) => {
    setState({ ...state, filters: newFilters });
  };

  const onChangeSort = (newSort) => {
    setState({ ...state, sort: newSort });
  };

  const onChangeSearch = (newSearch) => {
    setState({ ...state, search: newSearch });
  }

  return (
    <div className="App">
      <Menu
        pageName={pageName}
        onUpdatePage={onUpdatePage}
        onChangeFilters={onChangeFilters}
        onChangeSearch={onChangeSearch}
        onChangeSort={onChangeSort}
        sort={sort}
        filters={filters}
      />
      {state.page}
      <CssBaseline />
      {pageName === 'Fish' && (
        <Creatures type="fish" filters={filters} search={search} sort={sort} />
      )}
      {pageName === 'Bugs' && (
        <Creatures type="bugs" filters={filters} search={search} sort={sort} />
      )}
    </div>
  );
}

export default AnimalCrossing;