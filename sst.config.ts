import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "sst-ask-wayne",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, "site", {
        path: "packages/frontend",
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  }
} satisfies SSTConfig;
