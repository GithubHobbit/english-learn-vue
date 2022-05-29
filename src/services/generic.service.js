import axios from 'axios';

const API_URL = process.env.VUE_APP_BACKEND_URL;
export const request = async ({ url, method, data, headers }) => {
  console.log(data);
  const response = await axios({
    url: `${API_URL}/${url}`,
    data,
    method,
    headers,
  });
  console.log('response');
  console.log(response);
  console.log('data');
  console.log(response.data);
  return response.data;
};
// const keys = Object.keys(err.response.data);
// console.log(keys);
// const values = Object.values(err.response.data);
// console.log(values);
