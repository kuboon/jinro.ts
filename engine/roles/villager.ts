import type { RoleModule } from "./types.ts";

const name = "villager";
const team = "villagers";
function choices() {
  return [];
}
export default {
  name,
  team,
  choices,
} satisfies RoleModule;
