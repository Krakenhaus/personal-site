import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Fishies from './components/Fishies';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <h1>Fishies!!</h1>
      <Container maxWidth="lg">
        <Typography component={Fishies} style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </div>
  );
}

export default App;
