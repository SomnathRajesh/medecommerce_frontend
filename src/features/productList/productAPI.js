// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/products');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  //filter = {"category":"homeopathy"}
  //TODO: on server we will support multiple values
  let queryString = '';
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8000/products?' + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
