import axios from "axios";

export const TOKEN = "20f07f91f3303b2f66ab6f61698d977d69b83d64";

/**
 * 新增連結
 * @param url
 */
const addShortcut = (url = "") => {
  return axios.post(
      `https://api.pics.ee/v1/links?access_token=${TOKEN}&caller=client-simple&lang=zh-tw`,
      {
        url: url
      }
  );
};

export default {
  addShortcut,
};
