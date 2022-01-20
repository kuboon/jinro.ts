import { RoleModule } from "./types.ts";
import { VillageState } from "../VillageState.ts";
import { CreatureId } from "../types.ts";

const name = "villager";
const team = "villagers" as const;
function choices(_state: VillageState, _id: CreatureId) {
  return [];
}
export default {
  name,
  team,
  choices,
  actions: {},
} as RoleModule;
