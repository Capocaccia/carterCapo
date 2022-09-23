import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/posts/uses", name: "Uses" },
      { path: "/", name: "Home" },
    ],
    baseUrl: "http://172.17.0.1:3000",
  },
  failOnDifference: true,
  generateOnly: true,
  waitBeforeScreenshot: 3000,
  threshold: 0.1,
};
