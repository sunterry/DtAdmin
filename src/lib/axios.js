import axios from 'axios';
import { baseURL } from '@/conf';
import { Spin } from 'iview';

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.timeOut = 10000;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
      timeout: this.timeOut,
    };
    return config;
  }
  request(options) {
    const instance = axios.create();
    const opts = Object.assign({}, this.getInsideConfig(), options);
    this.interceptors(instance, opts.url);
    return instance(opts);
  }
  distroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      Spin.hide();
    }
  }
  interceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      if (!Object.keys(this.queue).length) {
        Spin.show();
      } else {
        this.queue[url] = true;
      }
      return config;
    }, error => Promise.reject(error));
    instance.interceptors.response.use((response) => {
      this.distroy(url);
      const { code, message, ...obj } = response.data;
      if (response.status === 200 && (code && code === 1000)) {
        return Object.assign({}, { ...obj }, { message });
      }
      return Object.assign({}, { code, message });
    }, (error) => {
      this.distroy(url);
      /* eslint-disable-next-line */
      return Promise.reject(error);
    });
  }
}

export default HttpRequest;

