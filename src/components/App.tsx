import { useEffect, useState } from "react";
import styled from 'styled-components'
import Button from "./Button";

const Form = styled.form`
  border: lightgrey 2px solid;
  border-radius: 15px;
  padding: 2rem;
`

const Table = styled.table`
  border: lightgrey 2px solid;
  border-radius: 15px;
  padding: 2rem;
  .level-low {
    background: darkred;
    color: white;
  }
  .level-good {
    background: lightgreen
  }
`

const App = () => {
  const [stock, setStock] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [lowStockBool, setLowStockBool] = useState(false);

  /* what is this function for? What information needs to be displayed t the user? 
    consider using map() to iterate through arrays. */
  const lowStock = () => {
    var c = 0;
    for (var i = 0; i < stock.length; i++) {
      if (!stock[i].low_stock) c++;
    }
    return c;
  };

/* Here I have refactored some functions that set state outside the render to jkeep render 'pure' */
  const resetForm = () => {
    setTitle("");
    setLowStockBool(false);
  }

  const addItem = (item) => {
    setStock([...stock, item])
    resetForm()
  };

  const deleteItem = (item) => {
    setStock(item)
  }

  /* Refactored into an ES6 function component */
  const Items = () => {
    const items =  stock && stock.map((stockItem, index) => {
    const stockLevelClass = stockItem.low_stock ? 'level-low' : 'level-good'

    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{stockItem.title}</td>
        <td className={stockLevelClass}>{stockItem.low_stock ? "Low" : "Good"}</td>
        <td>
          {/* extracted button to its own component which can take props, depending on its status */}
          <Button
            className="btn btn-sm btn-danger"
            /* move this function out of the render and write a handler function instead (see addItem() */
            onClick={() => deleteItem(stock.filter((value, id) => index !== id))}
            children = "Remove Item"
          />
        </td>
      </tr>
      )
    })
    return items;
  };

  return (
    <div className="container mt-3">
      <Form>
        <div className="mb-3">
          <h1>Inventory Dashboard</h1>
          <h2>Stock Items</h2>
          <label className="form-label" htmlFor="name" >Item Name</label>
          <input
            className="form-control"
            name="name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="lowstockcheck"
            checked={lowStockBool}
            /* TODO move setState out of render - like addItem */
            onChange={(event) => setLowStockBool(event.target.checked)}
          />
          <label className="form-check-label">Low Stock?</label>
        </div>
        <button
          type="button"
          /* TODO move setState out of render - like addItem */
          onClick={() => {
            addItem(            
              {
              title,
              low_stock: lowStockBool
            })
          }}
          className="btn btn-primary"
        >
          Add Item
        </button>
      </Form>
      {/* See comments for lowStock() function declaration- what is this for ? */}
      <h3 className="mt-3">Stock {lowStock()} running low</h3>
      <Table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Stock Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Items />
        </tbody>
      </Table>
    </div>
  );
};

export default App;
