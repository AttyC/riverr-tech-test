
export const resetForm = () => {
  setTitle("");
  setLowStockBool(false);
}

export const addItem = (item) => {
  setStock([...stock, item])
  resetForm()
};

export const deleteItem = (item) => {
  setStock(item)
}

