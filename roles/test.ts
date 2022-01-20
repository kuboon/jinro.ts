import { roleModules } from "./mod.ts";
Deno.test({
  name: "test",
  fn: () => {
    const wolf = roleModules.wolf;
  }
})
