export const arrayRandom = (array: Array<any>) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const findById = (resources, id) => {
  if (!resources) {
    return null;
  }
  return resources.find((r) => r.id === id);
};

export default {
  findById,
  arrayRandom,
};
