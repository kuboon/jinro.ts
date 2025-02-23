import { RoleModule } from "./types.ts";

const name = "bodyguard" as const;
const team = "villagers" as const;
function choices() {
  return ["guard"];
}
export default {
  name,
  team,
  choices,
} satisfies RoleModule;
