import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function App2() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/books")
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((err) => console.log(err));
  }, []);

  const typeCount = {};

  books.forEach((book) => {
    if (typeCount[book.type]) {
      typeCount[book.type]++;
    } else {
      typeCount[book.type] = 1;
    }
  });

  const data = {
    labels: Object.keys(typeCount),
    datasets: [
      {
        data: Object.values(typeCount),
        backgroundColor: ["orange", "blue", "red", "green"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  return (
      <div>
        <table border="1">
          <thead>
          <tr>
            <th>Id</th>
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
                <td>{book.available.toString()}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <div style={{ width: "300px", height: "300px" }}>
          <Pie data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
  );
}

export default App2;