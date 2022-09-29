import got from 'got'
const _options = {}

export const http = {
  get: (url, options = _options) => {
    return got.get(url, options)
  },
  post: (url, options = _options) => {
    return got.post(url, options)
  }
}
