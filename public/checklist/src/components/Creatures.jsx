import React, { Component } from 'react';
import {
  Grid,
  LinearProgress,
} from '@material-ui/core';
import Creature from './Creature';

const storageKey = type => `greg-acnh-${type}`;
class Creatures extends Component {
  state = {
    isLoading: true,
    creatures: []
  };

  constructor(props) {
    super(props);
    this.toggleAccumulation = this.toggleAccumulation.bind(this);
    this.mergeSavedData = this.mergeSavedData.bind(this);
  }

  async componentDidMount() {
    const { type } = this.props;
    const response = await fetch(`/${type}`);
    let creatures = await response.json();
    creatures = creatures.sort((a, b) => {
      // Use toUpperCase() to ignore character casing
      const creatureA = a.name.toUpperCase();
      const creatureB = b.name.toUpperCase();

      let comparison = 0;
      if (creatureA > creatureB) {
        comparison = 1;
      } else if (creatureA < creatureB) {
        comparison = -1;
      }
      return comparison;
    });
    this.setState({ creatures });
    this.mergeSavedData();
  }

  getSavedData() {
    const { type } = this.props;
    const localStorage = window && window.localStorage;
    if (localStorage) {
      return JSON.parse(localStorage.getItem(storageKey(type))) || {};
    }
    // No LocalStorage, so nothing will work
    return {};
  }

  toggleAccumulation(e, prop) {
    const { type } = this.props;
    const id = e.target.parentNode.parentNode.dataset.id;
    const savedData = this.getSavedData();
    if (savedData[id]) {
      savedData[id][prop] = !savedData[id][prop];
    } else {
      savedData[id] = {}
      savedData[id][prop] = true;
    }
    localStorage.setItem(storageKey(type),  JSON.stringify(savedData));
    this.mergeSavedData();
  }

  mergeSavedData()
  {
    const { creatures } = this.state;
    const savedData = this.getSavedData();

    const newCreatures = creatures.map((creature) => {
      const container = creature;
      const savedCreatureData = savedData[creature.index];
      if (savedCreatureData)
      {
        container.isDonated = savedCreatureData.isDonated;
        container.isHoarded = savedCreatureData.isHoarded;
      }
      return container;
    });

    this.setState({ creatures: newCreatures, isLoading: false });
  }

  render() {
    const { type } = this.props;
    const { isLoading, creatures } = this.state;
    if (isLoading) {
      return <LinearProgress variant="query" />;
    }

    const CreatureList = creatures.map((creature) =>
      <Grid item xs key={creature.index}>
        <Creature {...creature} type={type} toggleAccumulation={this.toggleAccumulation} />
      </Grid>
    );

    return (
      <div style={{flexGrow: 1}}>
        <Grid container spacing={3}>
          {CreatureList}
        </Grid>
      </div>
    );
  }
}

export default Creatures;
