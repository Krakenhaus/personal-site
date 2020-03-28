import React, { useEffect, useState } from 'react';
import {
  Grid,
  LinearProgress,
} from '@material-ui/core';
import Creature from './Creature';

export default function Creatures(props) {

  const { type } = props;
  const [state, setState] = useState({
    creatures: [],
    isLoading: true,
  });
  const { creatures, isLoading } = state;

  useEffect(() => {
    async function fetchCreatures() {
      const response = await fetch(`/api/${type}`);
      let newCreatures = await response.json();
      newCreatures = newCreatures.sort((a, b) => {
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
      setState({ creatures: newCreatures });
    }
    fetchCreatures();
  }, [type]);

  if (isLoading) {
    return <LinearProgress variant="query" />;
  }

  const monthRegion = 'northernMonths';
  const CreatureList = creatures.map((creature) =>
    <Grid item xs key={creature.index}>
      <Creature {...creature} type={type} activeMonths={creature[monthRegion]} />
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
