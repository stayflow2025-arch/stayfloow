import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  output: "standalone",
  cloudflare: {
    worker: {
      name: "stayfloow",
    },
  },
};

export default config;
