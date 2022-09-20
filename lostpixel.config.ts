import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ id: "capocaccia.dev/", path: "/posts/uses", name: "Uses" }],
    pageUrl: "http://localhost:3000/posts/uses",
  },
  generateOnly: true,
  failOnDifference: true,
};
