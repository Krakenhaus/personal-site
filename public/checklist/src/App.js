import React from 'react';
import Container from '@material-ui/core/Container';
import {
  CssBaseline,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import Menu from './components/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Creatures from './components/Creatures';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

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

      <Container maxWidth="lg" style={{'margin-top': 20}}>
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
