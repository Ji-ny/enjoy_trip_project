// src/main/webapp/resources/js/backend.js
// 공통 백엔드 통신 유틸리티
(function () {
  const backend = {};

  function resolve(path) {
    const root = window.APP_CONTEXT || '';
    if (!path.startsWith('/')) {
      return root + '/' + path;
    }
    return root + path;
  }

  async function request(path, options = {}) {
    const url = resolve(path);
    const headers = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json; charset=UTF-8');
      if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
      }
    }

    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
    });

    if (response.status === 204) {
      return null;
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = data?.message || data?.error || response.statusText;
      const error = new Error(message);
      error.status = response.status;
      error.payload = data;
      throw error;
    }

    return data;
  }

  backend.request = request;
  backend.get = (path) => request(path);
  backend.post = (path, body) => request(path, { method: 'POST', body });
  backend.put = (path, body) => request(path, { method: 'PUT', body });
  backend.patch = (path, body) => request(path, { method: 'PATCH', body });
  backend.delete = (path, body) => request(path, { method: 'DELETE', body });

  window.ETBACKEND = backend;
})();
