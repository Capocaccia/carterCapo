import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { id: "capocaccia.dev/posts/uses", path: "/posts/uses", name: "Uses" },
      { id: "capocaccia.dev/", path: "/", name: "Home" },
    ],
    pageUrl: "http://localhost:3000",
  },
  generateOnly: true,
  failOnDifference: true,
  waitBeforeScreenshot: 3000,
  threshold: 0.3,
};
