import { RoleModule, Team } from "./types.ts";
import { VillageState } from "../VillageState.ts";
import { CreatureId } from "../types.ts";

const name = "bodyguard";
const team = "villagers" as Team;
function choices() {
  return ['guard'];
}
function guard(){
  return {
    logs: [],
    died: [],
  }
}
export default {
  name,
  team,
  choices,
  actions: { guard },
} as RoleModule;
