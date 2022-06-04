import axios from "axios";

export function postLink(params) {
  return axios.post("/api/url", params);
}
