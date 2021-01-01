import axios from "axios";

class Http {
  constructor() {
    this.timeout = 5000;
    this.baseURL =
      process.env.NODE_ENV === "development" ? "https://www.baidu.com" : "/";
  }
  mergeOptions(obj = {}) {
    return {
      timeout: this.timeout,
      baseURL: this.baseURL,
      ...obj
    };
  }
  setInterceptor(instance) {
    instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        if (response.status === 200) {
          if (response.data.err == 1) {
            return Promise.reject(response.message);
          }
          return response.data;
        }
        if (response.status === 404) {
          return Promise.reject("404");
        }
        return response.data;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  require(options) {
    let config = this.mergeOptions(options);
    let instance = axios.create();
    this.setInterceptor(instance);
    return instance(config);
  }
  get(url, config = {}) {
    return this.require({
      url,
      method: "get",
      ...config
    });
  }
  post(url, data) {
    return this.require({
      url,
      method: "post",
      data
    });
  }
}
export default new Http();
