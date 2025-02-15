import type { RoleModule } from "./types.ts";

const name = "villager";
const team = "villagers" as const;
function choices() {
  return [];
}
export default {
  name,
  team,
  choices,
  actions: {},
} satisfies RoleModule;
