// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/products');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({ filter, sort, pagination }) {
  //filter = {"category":["homeopathy","allopathy"]}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page:1,_limit=10}
  //TODO: on server we will support multiple values
  let queryString = '';
  for (let key in filter) {
    if (
      filter.hasOwnProperty(key) &&
      Array.isArray(filter[key]) &&
      filter[key].length
    ) {
      const categoryValues = filter[key];
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8000/products?' + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
