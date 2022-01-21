import { Action, CreatureId, Log } from "../types.ts";
import { VillageState } from "../VillageState.ts";

export type Team = "villagers" | "wolves" | "lovers";
export type ChoiceFunc = (state: VillageState, id: CreatureId) => string[] 
export type ActionResults = { logs: Log[], died: { id: CreatureId, reason: string }[] }
export type ActionFunc = (state: VillageState, action: Action) => ActionResults
export type RoleModule = {
  name: string
  team: Team
  choices: ChoiceFunc
  actions: Record<string, ActionFunc>
}
