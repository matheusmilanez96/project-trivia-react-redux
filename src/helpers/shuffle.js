const shuffle = (array) => {
  const auxiArray = [...array];
  for (let index = auxiArray.length; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * index);
    const element = auxiArray[index - 1];
    auxiArray[index - 1] = auxiArray[randomIndex];
    auxiArray[randomIndex] = element;
  }

  return auxiArray;
};

export default shuffle;
