import axios, { Method } from 'axios';
// should only be used directly for non-GET request methods.
const httpRequest = async <T, B = unknown>(url: string, method: Method = 'GET', body?: B | undefined) => {
  const config = { url, method, body };

  return await axios<T>(config).then((response) => {
    return response.data;
  });
};

export default httpRequest;
