export const nonConcurrentMapOfWebElements = async (arr, fn) => {
  const data = [];
  for (let i = 0; i < arr.length; i += 1) {
    const current = arr[i];
    const newData = await fn(current);
    data.push(newData);
  }
  return data;
};

export const nonConcurrentMapOfLinks = async (driver, arr, fn) => {
  const data = [];
  for (let i = 0; i < arr.length; i += 1) {
    const current = arr[i];
    const newData = await fn(driver, current);
    data.push(newData);
  }
  return data;
};
