import axios from "axios";

const apiAxios = async (url, accessToken, { method, data }) => {
  return await axios({
    url,
    method,
    data,
    headers: { authorization: accessToken },
  });
};

export default apiAxios;
