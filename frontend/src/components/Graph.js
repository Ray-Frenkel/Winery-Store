import React from "react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
function Graph() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/products/search" + "/all" + "/all" + "/all"
        );
        setResult(response.data);
      } catch (err) { }
    };

    fetchData();
  });

  const wineryRatingsByLocation = result.reduce((acc, { location }) => {
    if (!acc[location]) {
      acc[location] = {
        name: location,
        count: 1,
      };
    } else {
      acc[location].count++;
    }
    return acc;
  }, {});

  const wineryRatings = Object.values(wineryRatingsByLocation).map(
    ({ name, count }) => ({
      name,
      amount: count,
    })
  );

  return (
    <div>
      <h2>Wines per location</h2>
      <BarChart
        width={800}
        height={400}
        data={wineryRatings}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Graph;
