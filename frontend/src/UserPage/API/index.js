import axios from 'axios';

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
// const loadData = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/patient`);
//     setData(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getPatientsAxios =  async () => {
  try{
    const response = await axios.get('http://localhost:3210/patient/dto');
    console.log(response.data[0].id)
  }catch(error){
    console.error(error)
  }
}

export const getPatients = () => {
  return fetch("http://localhost:3210/patient/dto").then(
    (res) => {
     // console.log(res.json())
      res.json()
    }
  );
}
