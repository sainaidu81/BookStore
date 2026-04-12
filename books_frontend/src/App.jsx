import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Legend); //display chart

function App() {//main
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/books")
        .then((res) => res.json()) //convert to json
        .then((data) => setBooks(data)) //stores in books
        .catch((err) => console.error(err));
  }, []); //run only once

  //  Dynamic Type Count
  const typeCounts = {};

  books.forEach((b) => {
    if (typeCounts[b.type]) {
      typeCounts[b.type]++;
    } else {
      typeCounts[b.type] = 1;
    }
  });

// Convert to chart format
  const typeData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FF9F40"
        ]
      }
    ]
  };

  // count availability
  const availableCount = books.filter(b => b.available).length;
  const notAvailableCount = books.filter(b => !b.available).length;


  // // Pie Data - Type
  // const typeData = {
  //   labels: ["Fiction", "Non-Fiction"],
  //   datasets: [
  //     {
  //       data: [fictionCount, nonFictionCount],
  //       backgroundColor: ["#36A2EB", "#FF6384"]
  //     }
  //   ]
  // };


  // Pie Data - Availability
  const availabilityData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [availableCount, notAvailableCount],
        backgroundColor: ["#4CAF50", "#F44336"]
      }
    ]
  };

  return (
      <div style={{ padding: "20px" }}>
        <h2>Books</h2>

        {/* PIE CHARTS */}
        <div style={{ display: "flex", gap: "50px" }}>
          <div style={{ width: "300px" }}>
            <h3>Type Distribution</h3>
            <Pie data={typeData} />
          </div>

          <div style={{ width: "300px" }}>
            <h3>Availability</h3>
            <Pie data={availabilityData} />
          </div>
        </div>

        {/* TABLE */}
        <h3 style={{ marginTop: "40px" }}>Books List</h3>
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Available</th>
          </tr>
          </thead>
          <tbody>
          {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.type}</td>
                <td>{book.available ? "Yes" : "No "}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;
