import { Action, CreatureId, Log, Team } from "../types.ts";
import { VillageState } from "../VillageState.ts";

export type ChoiceFunc = (state: VillageState, dayNum: number) => string[] 
export type ActionResults = { logs: Log[], died: { id: CreatureId, reason: string }[] }
export type ActionFunc = (action: Action, state: VillageState) => ActionResults
export type RoleModule = {
  name: string
  team: Team
  actions: Record<string, ActionFunc>
}
