import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ path: "/", name: "home" }],
    pageUrl: "http://localhost:3000",
  },
  generateOnly: true,
  failOnDifference: true,
};
