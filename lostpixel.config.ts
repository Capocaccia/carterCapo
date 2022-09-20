import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ path: "/app", name: "app" }],
    pageUrl: "http://localhost:3000",
  },
  generateOnly: true,
  failOnDifference: true,
};
