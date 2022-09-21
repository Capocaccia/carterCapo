import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { id: "capocaccia.dev/posts/uses", path: "/posts/uses", name: "Uses" },
      { id: "capocaccia.dev/", path: "/", name: "Home" },
    ],
    pageUrl: "http://172.17.0.1:3000",
  },
  failOnDifference: true,
  generateOnly: true,
  waitBeforeScreenshot: 3000,
  threshold: 0.3,
  timeouts: {
    loadState: 50000,
  },
};
