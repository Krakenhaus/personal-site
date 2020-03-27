import React, { Component } from 'react';
import {
  Grid,
  LinearProgress,
} from '@material-ui/core';
import Fish from './Fish';

const storageKey = 'greg-acnh-fish';
class Fishies extends Component {
  state = {
    isLoading: true,
    fishies: []
  };

  constructor(props) {
    super(props);
    this.toggleAccumulation = this.toggleAccumulation.bind(this);
    this.mergeSavedData = this.mergeSavedData.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/fish');
    const fishies = await response.json();
    console.log(fishies);
    this.setState({ fishies });
    this.mergeSavedData();
  }

  getSavedData() {
    const localStorage = window && window.localStorage;
    if (localStorage) {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    }
    // No LocalStorage, so nothing will work
    return {};
  }

  toggleAccumulation(e, prop) {
    const id = e.target.parentNode.parentNode.dataset.id;
    const savedData = this.getSavedData();
    if (savedData[id]) {
      savedData[id][prop] = !savedData[id][prop];
    } else {
      savedData[id] = {}
      savedData[id][prop] = true;
    }
    localStorage.setItem(storageKey,  JSON.stringify(savedData));
    this.mergeSavedData();
  }

  mergeSavedData()
  {
    const { fishies } = this.state;
    const savedData = this.getSavedData();

    const newFishies = fishies.map((fish) => {
      const container = fish;
      const savedFishData = savedData[fish.index];
      if (savedFishData)
      {
        container.isDonated = savedFishData.isDonated;
        container.isHoarded = savedFishData.isHoarded;
      }
      return container;
    });

    this.setState({ fishies: newFishies, isLoading: false });
  }

  render() {
    const { isLoading, fishies } = this.state;
    if (isLoading) {
      return <LinearProgress variant="query" />;
    }

    const FishList = fishies.map((fish) =>
      <Grid item xs key={fish.index}>
        <Fish {...fish} toggleAccumulation={this.toggleAccumulation} />
      </Grid>
    );

    return (
      <div style={{flexGrow: 1}}>
        <Grid container spacing={3}>
          {FishList}
        </Grid>
      </div>
    );
  }
}

export default Fishies;
