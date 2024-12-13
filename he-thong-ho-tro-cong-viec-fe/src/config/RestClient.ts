import axios, { AxiosResponse } from "axios";

let accessToken = "";

export const setAccessToken = (_accessToken: string) => {
  console.log('[LOG_DEBUG][setAccessToken]', _accessToken)
  accessToken = _accessToken;
};

export const getAccessToken = () => accessToken;

// Config axios
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.API_URL
});
instance.defaults.headers.common.Accept = "application/json";
instance.defaults.timeout = 60000;

async function getToken() {
  if (accessToken) {
    return accessToken;
  }
  return null;
}

const getHttpHeaders = async (isAuthenticated = true) => {
  // Add your custom logic here, for example add a Token to the Headers
  if (isAuthenticated) {
    const jwt = await getToken();
    return {
      headers: {
        Authorization: jwt && jwt !== "undefined" ? "Bearer " + jwt : "",
      },
    };
  }

  return {};
};

const get = async (path: string, params = {}): Promise<AxiosResponse> =>
  instance.get(path, Object.assign(await getHttpHeaders(), params));

const del = async (path: string, params = {}): Promise<AxiosResponse> =>
  instance.delete(path, Object.assign(await getHttpHeaders(), params));

const post = async (
  path: string,
  data: any,
  params = {}
): Promise<AxiosResponse> =>
  instance.post(path, data, Object.assign(await getHttpHeaders(), params));

const put = async (path: string, data: any): Promise<AxiosResponse> =>
  instance.put(path, data, await getHttpHeaders());

const patch = async (path: string, data: any): Promise<AxiosResponse> =>
  instance.post(path, data, await getHttpHeaders());

export default {
  get,
  del,
  post,
  put,
  patch,
  setAccessToken,
};
