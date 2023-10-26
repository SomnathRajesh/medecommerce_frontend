// A mock function to mimic making an async request for data
export function fetchLoggedInUser(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Users/` + user.id
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserAddresses(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Addresses/` + userId
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchAllUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Users`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Orders/` + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function updateUserAddress(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Addresses/` + update.id,
      {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function addUserAddress(address) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Addresses`,
      {
        method: 'POST',
        body: JSON.stringify(address),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function deleteUserAddress(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Addresses/` + id,
      {
        method: 'DELETE',
      }
    );

    if (response.status === 204) {
      // 204 status code indicates a successful deletion.
      resolve({ success: true });
    } else {
      const data = await response.json();
      resolve({ success: false, error: data });
    }
  });
}
