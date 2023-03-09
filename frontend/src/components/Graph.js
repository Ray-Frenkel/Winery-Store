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

const data = [
  { name: "Product 1", rating: 4.5 },
  { name: "Product 2", rating: 3.2 },
  { name: "Product 3", rating: 4.8 },
  { name: "Product 4", rating: 2.9 },
  { name: "Product 5", rating: 4.2 },
  { name: "Product 6", rating: 4.5 },
  { name: "Product 7", rating: 3.2 },
  { name: "Product 8", rating: 4.8 },
  { name: "Product 9", rating: 2.9 },
  { name: "Product 10", rating: 4.2 },
  { name: "Product 11", rating: 4.5 },
  { name: "Product 12", rating: 3.2 },
  { name: "Product 13", rating: 4.8 },
  { name: "Product 14", rating: 2.9 },
  { name: "Product 15", rating: 4.2 },
  { name: "Product 16", rating: 4.5 },
  { name: "Product 17", rating: 3.2 },
  { name: "Product 18", rating: 4.8 },
  { name: "Product 19", rating: 2.9 },
  { name: "Product 20", rating: 4.2 },
  { name: "Product 21", rating: 4.2 },
  { name: "Product 22", rating: 4.5 },
  { name: "Product 23", rating: 3.2 },
  { name: "Product 24", rating: 4.8 },
  { name: "Product 25", rating: 2.9 },
  { name: "Product 26", rating: 4.2 },
  { name: "Product 27", rating: 4.5 },
  { name: "Product 28", rating: 3.2 },
  { name: "Product 29", rating: 4.8 },
  { name: "Product 30", rating: 2.9 },
];
function Graph() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          "/api/products/search" + "/all" + "/all" + "/all"
        );
        setResult(response.data);
      } catch (err) {

      }
    };

    fetchData();
  },);

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

  const wineryRatings = Object.values(wineryRatingsByLocation).map(({ name, count }) => ({
    name,
    amount: count,
  }));

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
