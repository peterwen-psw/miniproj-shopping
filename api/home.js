import request from "./../utils/request"

export function getProList(data) {
  return request.get('/pro/list',data)
}