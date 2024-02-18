import { StackContext, Api, EventBus, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    // environment: {
    //   VITE_APP_API_URL: api.url,
    // },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
