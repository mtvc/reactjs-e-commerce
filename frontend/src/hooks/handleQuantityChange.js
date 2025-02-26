function handleQuantityChange() {
  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = newQuantity;
      return updatedQuantities;
    });
  };
  return;
}

export default handleQuantityChange;
