import axios from "axios";
import { localStorageKeys } from "../config/localstorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const httpClient = axios.create({
  baseURL: "https://fincheck-api.zapto.org",
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
