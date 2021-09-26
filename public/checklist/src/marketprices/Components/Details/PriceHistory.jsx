import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Plot from "react-plotly.js";

import { TCGPlayerApi } from "../../Api";

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
};

const useStyles = makeStyles((theme) => ({
  plot: {
    border: "1px solid #aaa",
  },
}));

export default function DetailsDialog({ name, skuId }) {
  const [history, setHistory] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getPriceHistory = async () => {
      const priceHistory = await TCGPlayerApi.getPriceHistory(skuId);
      setHistory(priceHistory);
    };
    getPriceHistory();
  }, [skuId]);

  const nonNullMarketPriceHistory = history.filter((item) => {
    return !!item.marketPriceSnapshot;
  });

  const nonNullLowestPriceHistory = history.filter((item) => {
    return !!item.lowestListingPriceSnapshot;
  });

  const yMarketPrice = nonNullMarketPriceHistory.map((item) => {
    return item.marketPriceSnapshot;
  });

  const yLowestPrice = nonNullLowestPriceHistory.map((item) => {
    return item.lowestListingPriceSnapshot;
  });

  const x = nonNullMarketPriceHistory.map((item) => {
    const dates = new Date(item.insertTime);
    return dates.yyyymmdd();
  });

  return (
    <>
      <Plot
        className={classes.plot}
        data={[
          {
            x,
            y: yMarketPrice,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#555" },
          },
        ]}
        layout={{ width: 520, height: 340, title: `${name} Market Price` }}
      />
      <br />
      <br />
      <Plot
        className={classes.plot}
        data={[
          {
            x,
            y: yLowestPrice,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#555" },
          },
        ]}
        layout={{ width: 520, height: 340, title: `${name} Lowest Price` }}
      />
    </>
  );
}
