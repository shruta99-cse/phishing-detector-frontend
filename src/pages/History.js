import React, { useEffect, useState } from "react";
import { getHistory } from "../api";
import { theme } from "../theme";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory().then((res) => setData(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2>📜 Prediction History</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.email_text}</td>
              <td style={{ color: item.prediction === 1 ? "red" : "lightgreen" }}>
                {item.prediction === 1 ? "Spam" : "Safe"}
              </td>
              <td>{item.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: theme.dark,
    color: theme.text,
    padding: "30px",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    color: "white",
  },
};

export default History;