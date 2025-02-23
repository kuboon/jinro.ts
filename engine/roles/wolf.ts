import { CreatureClass } from "../VillageState.ts";
import type { RoleModule } from "./types.ts";

function choices(this: CreatureClass) {
  if (this.state.dayNum != 0) {
    return ["bite"];
  }
  return [];
}

export default {
  name: "wolf",
  team: "wolves" as const,
  choices,
} satisfies RoleModule;
