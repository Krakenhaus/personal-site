import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { sortCreatures } from "../utils/sort";
import { searchCreatures } from "../utils/search";
import { filterCreatures } from "../utils/filter";
import Creature from "./Creature";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function Creatures(props) {
  const { type, search, sort, filters } = props;
  const [creatures, setCreatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [sort, search, filters]);

  useEffect(() => {
    async function fetchCreatures() {
      const response = await fetch(`/api/animalcrossing/${type}`);
      let newCreatures = await response.json();
      newCreatures = sortCreatures(newCreatures, sort);
      newCreatures = searchCreatures(newCreatures, search);
      newCreatures = filterCreatures(newCreatures, filters);
      setCreatures(newCreatures);
      setIsLoading(false);
    }
    fetchCreatures();
  }, [type, sort, search, filters]);

  if (isLoading) {
    return <CircularProgress style={{ margin: 100 }} />;
  }

  function CreatureList(props) {
    const {
      data: { itemsPerRow, monthRegion },
      index,
      style,
    } = props;
    const trueIndex = index * itemsPerRow;
    const padding = index === 0 ? { marginTop: 40 } : {};
    const rowData = creatures
      .slice(trueIndex, trueIndex + itemsPerRow)
      .map((creature) => (
        <Grid item key={creature.index} style={padding}>
          <Creature
            {...creature}
            type={type}
            activeMonths={creature[monthRegion]}
          />
        </Grid>
      ));

    return (
      <div style={style}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={10}
        >
          {rowData}
        </Grid>
      </div>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        const itemWidth = 455;
        let itemsPerRow = Math.floor(width / itemWidth) || 1;
        itemsPerRow = itemsPerRow > 3 ? 3 : itemsPerRow;
        const itemCount = Math.ceil(creatures.length / itemsPerRow);
        const monthRegion = "northernMonths";
        return (
          <FixedSizeList
            itemData={{ itemsPerRow, monthRegion }}
            height={height - 64}
            width={width}
            itemSize={350}
            itemCount={itemCount}
            style={{ overflowX: "hidden" }}
          >
            {CreatureList}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  );
}
