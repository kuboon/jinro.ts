import { ActionType } from "../types.ts";
import { CreatureClass } from "../VillageState.ts";
import type { RoleModule, Team } from "./types.ts";

const name = "lover";
const team: Team = "lovers";

const proposeAction = "propose" as ActionType;

function choices(this: CreatureClass) {
  if (this.state.dayNum == 0) {
    return [proposeAction];
  }
  return [];
}

export default {
  name,
  team,
  choices,
} satisfies RoleModule;
