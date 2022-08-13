import request from "./../utils/request"

export function getProDetail(proid) {
  return request.get('/pro/detail/' + proid)
}