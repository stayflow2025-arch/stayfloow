import { builder } from '@builder.io/react';

// Initialize Builder.io with your API key
const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (builderApiKey) {
  builder.init(builderApiKey);
}

export { builder };
