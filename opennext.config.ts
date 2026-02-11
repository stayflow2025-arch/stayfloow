import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  output: "standalone",
  cloudflare: {
    workers: {
      name: "stayfloow",
    },
  },
};

export default config;
