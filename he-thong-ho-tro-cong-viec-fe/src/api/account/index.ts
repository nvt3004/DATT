import RestClient from "@/config/RestClient";
import { AxiosResponse } from "axios";
import { UserAccount } from "../userServicePath";

export const __findCurrentUser = () => {
  return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
    RestClient.get(UserAccount.FIND_CURRENT_ACCOUNT)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
