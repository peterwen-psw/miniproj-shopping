import request from "../utils/request"
export function getFeilei (data) {
  return request.get('/pro/categorylist',data)
}
export function getSearch (data) {
  return request.get('/pro/search',data)
}
export function getFeileiList (data) {
  return request.get('/pro/categorybrandlist',data)
}
export function Fenlei (data) {
  return request.get('/pro/categorybrandprolist',data)
}