import axios from "axios";
import { API_ENDPOINTS, API_URL } from "../utils/consts";

export const getAuthToken = async (endpoint) => {
  let apiData = await axios.get(API_URL + endpoint).then((res) => res.data.token).catch(err => {
    console.log("ERROR IN callApi: ", err);
  });
  localStorage.setItem("user-access-token", apiData);
  return apiData;
};


export const getSearchResultsData = async (headers, searchQuery) => {
  let apiData = await axios.get(API_URL + API_ENDPOINTS.getData + searchQuery, {
    headers
  }).then((res) => res.data).catch(err => {
    console.log("Error in getSearchResultsData: ", err);
  })
  return apiData
}