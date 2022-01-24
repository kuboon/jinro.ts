import { Action, CreatureId, Log } from "../types.ts";
import { CreatureClass, VillageState } from "../VillageState.ts";

export type Team = "villagers" | "wolves" | "lovers";
export type EventName = 'afteractions'
export type ChoiceFunc = (state: VillageState, id: CreatureId) => string[] 
export type ActionResults = { logs: Log[], died: { id: CreatureId, reason: string }[] }
export type ActionFunc = (state: VillageState, action: Action) => ActionResults
export type EventHandler = (event: EventName, creature: CreatureClass) => Log[]
export type RoleModule = {
  name: string
  team: Team
  choices: ChoiceFunc
  actions: Record<string, ActionFunc>
  on?: EventHandler
}
