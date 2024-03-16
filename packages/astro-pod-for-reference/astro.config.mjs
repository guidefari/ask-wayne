import { defineConfig } from "astro/config";
import aws from "astro-sst";

export default defineConfig({
  output: "server",
  adapter: aws(),
  server: {
    port: 4200,
  }
});
