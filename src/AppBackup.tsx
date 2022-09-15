import { useState } from "react";

import "./App.css";

const App = () => {
  const [stock, setStock] = useState<any>([]);

  const [title, setTitle] = useState("");
  const [lowStockBool, setLowStockBool] = useState(false);

  const lowStock = () => {
    var c = 0;
    for (var i = 0; i < stock.length; i++) {
      if (!stock[i].low_stock) c++;
    }
    return c;
  };

  const getItems = () => {
    var r = [];

    for (var i = 0; i < stock.length; i++) {
      let index = i;

      r.push(
        <tr key={index}>
          <td>{index}</td>
          <td>{stock[index].title}</td>
          <td>{stock[index].low_stock ? "Yes" : "No"}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setStock(stock[index].filter((value, id) => index !== id));
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }

    return r;
  };

  return (
    <div className="container mt-3">
      <form>
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="shipped"
            checked={lowStockBool}
            onChange={(event) => setLowStockBool(event.target.checked)}
          />
          <label className="form-check-label">Low Stock?</label>
        </div>
        <button
          type="button"
          onClick={(event) => {
            setStock([
              ...stock,
              {
                title,
                low_stock: lowStockBool
              }
            ]);

            setTitle("");
            setLowStockBool(false);
          }}
          className="btn btn-primary"
        >
          Add Item
        </button>
      </form>
      <h3 className="mt-3">Sotck {lowStock()} running low</h3>
      <table className="table table-striped mt-3">
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Low Stock Level</th>
          <th>Actions</th>
        </thead>
        <tbody>{getItems()}</tbody>
      </table>
    </div>
  );
};

export default App;
