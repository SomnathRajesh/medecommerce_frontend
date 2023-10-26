export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Orders`,
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Orders/` + order.id,
      {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

// export function fetchAllOrders({ sort, pagination }) {
//   let queryString = '';
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/orders?' + queryString);
//     const data = await response.json();
//     const totalOrders = await response.headers.get('X-Total-Count');
//     resolve({ data: { orders: data, totalOrders: +totalOrders } });
//   });
// }

export function fetchAllOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Orders`
    );
    const data = await response.json();
    resolve({ data });
  });
}
