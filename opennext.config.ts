import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  output: "standalone",
  cloudflare: {
    // pas de worker ici
  },
};

export default config;
