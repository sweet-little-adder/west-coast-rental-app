function parseHeaderToJson(headerString) {
  const headers = new Headers(headerString);
  const headerObj = {};
  headers.forEach((value, key) => {
    headerObj[key] = value;
  });
  return headerObj;
}

const api = (headers = {}) => {
  const token = process.env.API_TOKEN;

  const baseUrl = process.env.API_BASE_URL;

  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.trim()}`,
    ...headers,
  };

  const baseOptions = {
    cache: "no-store",
  };

  return {
    get: async (url, _options = {}) => {
      const options = Object.assign(
        {
          headers: {},
          fetchOptions: {},
          settings: {
            baseUrl: true,
          },
          params: {},
        },
        _options
      );

      const _url = new URL(`${options.settings.baseUrl ? baseUrl : ""}${url}`);
      Object.keys(options.params).forEach((key) =>
        _url.searchParams.append(key, options.params[key])
      );

      return fetch(_url.toString(), {
        method: "GET",
        headers: {
          ...baseHeaders,
          ...options.headers,
        },
        ...{
          ...baseOptions,
          ...options.fetchOptions,
        },
      }).then(async (res) => {
        if (res.ok) {
          return {
            data: await res.json(),
            headers: parseHeaderToJson(res.headers),
          };
        }
        const error = new Error();
        error.status = res.status;
        error.statusText = await res.text();
        throw error;
      });
    },

    post: async (url, data, _options = {}) => {
      const options = Object.assign(
        {
          headers: {},
          fetchOptions: {},
          settings: {
            baseUrl: true,
          },
        },
        _options
      );

      return fetch(`${options.settings.baseUrl ? baseUrl : ""}${url}`, {
        method: "POST",
        headers: {
          ...baseHeaders,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...{
          ...baseOptions,
          ...options.fetchOptions,
        },
      }).then(async (res) => {
        if (res.ok) {
          return {
            data: await res.json(),
            headers: parseHeaderToJson(res.headers),
          };
        }
        const error = new Error();
        error.status = res.status;
        error.statusText = await res.text();
        throw error;
      });
    },

    put: async (url, data, _options = {}) => {
      const options = Object.assign(
        {
          headers: {},
          fetchOptions: {},
          settings: {
            baseUrl: true,
          },
        },
        _options
      );

      return fetch(`${options.settings.baseUrl ? baseUrl : ""}${url}`, {
        method: "POST",
        headers: {
          ...baseHeaders,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...{
          ...baseOptions,
          ...options.fetchOptions,
        },
      }).then(async (res) => {
        if (res.ok) {
          return {
            data: await res.json(),
            headers: parseHeaderToJson(res.headers),
          };
        }
        const error = new Error();
        error.status = res.status;
        error.statusText = await res.text();
        throw error;
      });
    },

    delete: async (url, _options = {}) => {
      const options = Object.assign(
        {
          headers: {},
          fetchOptions: {},
          settings: {
            baseUrl: true,
          },
        },
        _options
      );
      return fetch(`${options.settings.baseUrl ? baseUrl : ""}${url}`, {
        method: "DELETE",
        headers: {
          ...baseHeaders,
          ...options.headers,
        },
        ...{
          ...baseOptions,
          ...options.fetchOptions,
        },
      }).then(async (res) => {
        if (res.ok) {
          return {
            data: await res.json(),
            headers: parseHeaderToJson(res.headers),
          };
        }
        const error = new Error();
        error.status = res.status;
        error.statusText = await res.text();
        throw error;
      });
    },
  };
};

export default api;
