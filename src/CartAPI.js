import axios from "axios";

const API_ENDPOINT = "http://localhost:8000";

axios.defaults.headers.post['Content-Type'] = 'application/json'; // 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const fetchProductList = async () => {
  return await axios.get(`${API_ENDPOINT}/products`).then((res) => res.data);
};

export const fetchCartList = async () => {
  return await axios.get(`${API_ENDPOINT}/cart`).then((res) => res.data);
};

export const addToCartList = async (payload) => {
  return await axios
    .post(`${API_ENDPOINT}/cart/add`, payload)
    .then((res) => res.data);
};

export const removeFromCartList = async (payload) => {
  return await axios
    .post(`${API_ENDPOINT}/cart/remove`, payload)
    .then((res) => res.data);
};


export const checkoutCartItems = async (payload) => {
    return await axios
      .post(`${API_ENDPOINT}/cart/checkout`, payload)
      .then((res) => res.data);
};

export const updateQuantity = async (payload) => {
    return await axios
      .post(`${API_ENDPOINT}/cart/updateQty`, payload)
      .then((res) => res.data);
};
