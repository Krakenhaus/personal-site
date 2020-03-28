import React from 'react';
import Container from '@material-ui/core/Container';
import {
  CssBaseline,
} from '@material-ui/core';
import Menu from './components/Menu';
import './App.css';
import Creatures from './components/Creatures';

function App() {
  const [state, setState] = React.useState({ pageName: 'Fish' });
  const { pageName } = state;
  const onUpdatePage = (newPage) => {
      setState({ ...state, pageName: newPage });
  };

  return (
    <div className="App">
      <Menu pageName={pageName} onUpdatePage={onUpdatePage} />
      {state.page}
      <CssBaseline />

      <Container maxWidth="lg" style={{'marginTop': 20}}>
        {pageName === 'Fish' && (
          <Creatures type="fish" />
        )}
        {pageName === 'Bugs' && (
          <Creatures type="bugs" />
        )}
      </Container>
    </div>
  );
}

export default App;
